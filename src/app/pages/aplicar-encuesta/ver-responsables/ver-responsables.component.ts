import Chart from 'chart.js';
import { Component, OnInit, AfterViewChecked, ViewChild, HostListener, Output, EventEmitter, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'src/app/services/app.service';
import { trigger,style,transition,animate,keyframes,query,stagger,group, state, animateChild } from '@angular/animations';
import { EncuestaFormComponent } from '../../encuesta/encuesta-form/encuesta-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: "app-ver-responsables",
  templateUrl: "ver-responsables.component.html",
  styleUrls: ["ver-responsables.component.scss"],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class VerResponsablesComponent implements OnInit{
  ngOnInit(): void {

     console.log(this.data);
    this.getResponsables();

    throw new Error('ERROR DEL MODAL, QLE HUESO');
    
    






  }

  public responsables: any;
  public responsable: any;
  public tipo: any;

  public respuestas: any;

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

  public displayedColumns: string[] = [ 'nombre', 'identificacion', 'telefono', 'correo', 'cargo','confirmacion', 'acciones'];


  constructor(private servicio: AppService,
              public dialogRef: MatDialogRef<EncuestaFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any){ 
                this.tipo = 'todas';
 
  }


  

   ngAfterViewInit() {
  
  }

  verRespuestas(){
    this.tipo = 'todas';


  }


  cerrar(){
    this.dialogRef.close();
  }

  setResponsable(responsable: any){
      this.responsable = responsable;
    this.tipo = 'responsable'
    this.getPreguntas();
  }


  


  getResponsables(){
    this.servicio.openSpinner();
    this.servicio.get("responsables/respuestas/".concat(this.data.encuesta.id)).subscribe(
      result =>{this.servicio.closeSpinner(), this.responsables = result, console.log(result), this.getPreguntas();},
      error => {this.servicio.closeSpinner(), console.log(error)}
    )


  }

  verResponsables(e){
    console.log(e);
  }


  getPreguntas(){
    this.respuestas = [];
    switch (this.tipo) {
      case 'todas':
        this.servicio.openSpinner();
        this.servicio.get('resultadoencuestadetalle/'.concat(this.data.encuesta.id)).subscribe(
          result =>{this.servicio.closeSpinner(), this.respuestas = result, console.log(result)},
          error =>{this.servicio.closeSpinner(), console.log(error)}
        )
        break;

        case 'responsable':
          this.servicio.openSpinner();
          this.servicio.get('resultadoencuestadetalle/responsable/'+this.responsable.id).subscribe(
            result =>{this.servicio.closeSpinner(), console.log(result), this.respuestas = result},
            error =>{this.servicio.closeSpinner(), console.log(error)}
          )
        break;
    }
  }
 

}