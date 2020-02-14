import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'src/app/services/app.service';
import { trigger,style,transition,animate,keyframes,query,stagger,group, state, animateChild } from '@angular/animations';
import { VerResponsablesComponent } from '../ver-responsables/ver-responsables.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: "app-ver-encuestas",
  templateUrl: "ver-encuestas.component.html",
  styleUrls: ["ver-encuestas.component.scss"],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class VerEncuestasComponent implements OnInit {

  public encuestas: any;
  public searchInput: any;

  columnsToDisplay = ['consecutivo','entidad', 'encuesta', 'periodo', 'fecha','estado' , 'acciones'];
  expandedElement: any | null;

  public entidad: any;
  public entidades: any;
  public entidadFilterCtrl: any;

  @Output() aplicarEncuesta = new EventEmitter();
  @Output() editarEncuesta = new EventEmitter();


  @Input() tipo : number;

 
  public Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  public swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-info',
      cancelButton: 'btn btn-danger',
      title: 'title2'
    },
    buttonsStyling: false,
  });

  constructor(private servicio: AppService,  public dialog: MatDialog,){ 
    this.entidad = '';
 
  }



    public verResponsables(encuesta: any) {
    const dialogRef = this.dialog.open(VerResponsablesComponent, {
      data: {encuesta: encuesta }, 
      width: '60%', height: 'auto', minWidth: '70%', maxWidth: '50%',
      maxHeight: '90%', disableClose: false, backdropClass: 'dark', panelClass: 'box', closeOnNavigation: true
    });

    dialogRef.backdropClick().subscribe(() => {
      console.log("quepedo ksefjwiv")
      dialogRef.close();
    })

    dialogRef.afterClosed().subscribe(result => { if (result === 1) { this.getEncuestas() } });
  }



  ngOnInit() {
    switch (this.tipo) {
      case 1:
        this.getEncuestas();
        break;
      case 2:
        this.getEncuestasRealizadas();
        break;
    }
  }

  
  hacerEncuesta(e: any){
    this.aplicarEncuesta.emit(e);
  }

  deleteEncuesta(e: any){

      this.swalWithBootstrapButtons.fire({
        title: '¿Está seguro?',
        text: 'De eliminar la encuesta?',
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText : 'No',
        reverseButtons: false,
      }).then((result) => {
        if (result.value) {
          let ResultadoEncuesta = {
            id :  e.id,
            fecha : e.fecha,
            idEmpresa: e.idEmpresa.id,
            idEncuesta: e.idEncuesta.id,
            idEntidad: e.idEntidad.idEntidad,
            periodo: e.periodo,
            estado: 1
          }
          this.servicio.openSpinner();
          this.servicio.put("resultadoencuesta/eliminar",ResultadoEncuesta).subscribe(
            result => {this.servicio.closeSpinner(),  this.Toast.fire({type: 'success',title: 'encuesta',text: 'Eliminada con exito!'}), this.getEncuestasRealizadas(); console.log(result) },
            error => {this.servicio.closeSpinner(), this.Toast.fire({type: 'error',title: 'Error',text: 'No se pudo completar la acción'}), console.log(error)}
          )
        } else {
  
        }
      });

  }

  editEncuesta(encuesta: any){
    this.editarEncuesta.emit(encuesta);
  }


  getEncuestas(){
    this.servicio.openSpinner();
    this.servicio.get('encuestas/empresa').subscribe(
      result => {console.log(result), this.encuestas = result, this.servicio.closeSpinner(), this.Toast.fire({type: 'success',title: 'Encuestas',text: 'Actualizadas con exito'})},
      error =>{console.log(error), this.servicio.closeSpinner(), this.Toast.fire({type: 'error',title: 'Error',text: 'Al cargar encuestas'})}
    )
  }

  getEncuestasRealizadas(){
    this.servicio.openSpinner();
    this.servicio.get('resultadoencuesta/empresa').subscribe(
      result => {console.log(result), this.encuestas = result, this.servicio.closeSpinner(), this.getEntidades() ,this.Toast.fire({type: 'success',title: 'Encuestas',text: 'Actualizadas con exito'})},
      error =>{console.log(error), this.servicio.closeSpinner(), this.Toast.fire({type: 'error',title: 'Error',text: 'Al cargar encuestas'})}
    )
  }



  getEntidades(){
    this.servicio.openSpinner();
    this.servicio.get("list/departamentos").subscribe(
      result =>{ console.log(result), this.servicio.closeSpinner(), this.entidades = result, this.entidad = this.entidades[0]},
      error => {console.log(error), this.servicio.closeSpinner()}
    )
  }
  
  setEntidades(e){
    this.entidad = e;
  }


}