import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: "app-hacer-encuesta",
  templateUrl: "hacer-encuesta.component.html",
  styleUrls: ["hacer-encuesta.component.scss"]
})
export class HacerEncuestaComponent implements OnInit {
  public searchInput: any;
  public preguntas: Array<any>;
  public entidades: Array<any>;
  @Input() encuesta: any;
  @Input() tipo: any;

  public empresaCtrl: any;
  public empresaFilterCtrl: any;

  public encuestasDetalle: Array<any>;
  public encuestasDetalleSelected: any;
  public showAddObservacion: boolean;

  public periodo: any;

  public observacion: any;

  @Output() finish = new EventEmitter();
 
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

  constructor(private servicio: AppService ) { 
    this.empresaFilterCtrl = '';
    this.encuestasDetalle = [];
    this.showAddObservacion = false;
    this.observacion = '';
    
  }

  ngOnInit() {
    switch (this.tipo) {
      case 1:
        this.getPreguntas(this.encuesta.id,0,0,0,0);
        break;
      case 2:
        this.getPreguntasEdit(this.encuesta.id)
        break;
    }
    
  }
 


  getEntidades(){
    this.servicio.openSpinner();
    this.servicio.get("entidades/empresa").subscribe(
      (result: any) =>{this.servicio.closeSpinner(),console.log(result), this.entidades = result},
      error =>{this.servicio.closeSpinner(), console.log(error), this.Toast.fire({type: 'error',title: 'Error',text: 'Al consultar Entidades'})}
    )
  }

  getEntidadesEdit(){
    this.servicio.openSpinner();
    this.servicio.get("entidades/empresa").subscribe(
      (result: any) =>{this.servicio.closeSpinner(),console.log(result), this.entidades = result, 
        this.entidades.forEach(e=>{
          if(e.idEntidad == this.encuesta.idEntidad.idEntidad){
            this.empresaCtrl = e;
          }
        })},
      error =>{this.servicio.closeSpinner(), console.log(error), this.Toast.fire({type: 'error',title: 'Error',text: 'Al consultar Entidades'})}
    )
  }



  getPreguntas(encuesta, grupo, categoria, empresa, codigo){
    this.servicio.openSpinner();
    this.servicio.get("encuestadetalle/filter/"+encuesta+'/'+grupo+'/'+categoria+'/'+empresa+'/'+codigo).subscribe(
      (result : any) =>{this.servicio.closeSpinner(),console.log(result), this.preguntas = result, this.Toast.fire({type: 'success',title: 'Preguntas',text: 'Actualizadas con exito'}), this.setEncuestaDetalle(), this.getEntidades()},
      error => {this.servicio.closeSpinner(), console.log(error), this.Toast.fire({type: 'error',title: 'Error',text: 'Al consultar preguntas'});
      }
    )
  }


  getPreguntasEdit(encuestaDetalle){
    this.servicio.openSpinner();
    this.servicio.get("resultadoencuestadetalle/"+encuestaDetalle).subscribe(
      (result : any) =>{this.servicio.closeSpinner(),console.log(result), this.preguntas = result, this.Toast.fire({type: 'success',title: 'Preguntas',text: 'Actualizadas con exito'}),this.setEncuestaDetalleEdit(), this.getEntidadesEdit()},
      error => {this.servicio.closeSpinner(), console.log(error), this.Toast.fire({type: 'error',title: 'Error',text: 'Al consultar preguntas'});
      }
    )
  }

 
  
  selectEncuestaDetalleIndex(e){
    this.encuestasDetalleSelected = e;
    this.showAddObservacion = true;
    this.observacion = this.encuestasDetalle[e].observacion;
    this.Toast.fire({type: 'info',title: 'Pregunta '+this.preguntas[this.encuestasDetalleSelected].idPregunta.codigo,text: 'Seleccionada'})
  }

  setObservacion(){
    if(this.observacion == '' || this.observacion == null){
      this.Toast.fire({type: 'error',title: 'Error',text: 'Debe agregar una observación'});
      return;
    }
      this.encuestasDetalle[this.encuestasDetalleSelected].observacion = this.observacion;
      this.Toast.fire({type: 'success',title: 'Pregunta '+this.preguntas[this.encuestasDetalleSelected].idPregunta.codigo,text: 'Observación agregada con exito'})
      this.encuestasDetalleSelected = null;
      this.observacion = '';
      this.showAddObservacion = false;
    
  }

  eliminarObservacion(){
    this.swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: 'De eliminar la observacion de la pregunta '+this.preguntas[this.encuestasDetalleSelected].idPregunta.codigo+'?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText : 'No',
      reverseButtons: false,
    }).then((result) => {
      if (result.value) {
        this.encuestasDetalle[this.encuestasDetalleSelected].observacion = null;
        this.showAddObservacion = false;
        this.observacion = null;
        this.Toast.fire({type: 'info',title: 'Observación',text: 'Eliminada con exito!'})
      } else {

      }
    });
  }

  setEncuestaDetalleEdit(){
      this.preguntas.forEach(e => {
      let encuestaResultadoDetalle = {
        id: e.id,
        idResultadoEncuesta : e.idResultadoEncuesta.id,
        idPregunta: e.idPregunta.id,
        resultado: e.resultado,
        observacion: e.observacion,
        seguimiento: e.seguimiento,
        fechaSeguimiento : e.fechaSeguimiento,
        }
      this.encuestasDetalle.push(encuestaResultadoDetalle);
    });

    this.periodo = this.encuesta.periodo;
    console.log(this.encuestasDetalle);
  }

  setEncuestaDetalle(){
    this.preguntas.forEach(e =>{
        let encuestaResultadoDetalle = {
          idResultadoEncuesta : null,
          idPregunta: e.idPregunta.id,
          resultado: null,
          observacion: null,
          seguimiento: 1,
          fechaSeguimiento : null,
          }
        this.encuestasDetalle.push(encuestaResultadoDetalle);
    })
    console.log(this.encuestasDetalle);
  }



  sendEncuestaResultado(){
    if(this.periodo == '' || this.periodo == null){
      this.Toast.fire({type: 'error',title: 'Error',text: 'Debe asignar un periodo'})
      return;
    }
    if(this.empresaCtrl == null){
      this.Toast.fire({type: 'error',title: 'Error',text: 'Debe seleccionar una entidad'})
      return;
    }
    for (let i = 0; i < this.encuestasDetalle.length; i++) {
      if(this.encuestasDetalle[i].resultado == null){
        this.Toast.fire({type: 'error',title: 'Error',text: 'Debe completar todas las preguntas'})
        return;
      }
      if(i == (this.encuestasDetalle.length - 1)){
        this.doResult();
      }
    }
  }



  doResult(){
    let resultadoEncuesta;
    switch (this.tipo) {
      case 1:
       resultadoEncuesta = {
          idEntidad : this.empresaCtrl.idEntidad,
          idEncuesta: this.encuesta.id,
          periodo: this.periodo 
        }
        break;
     case 2:
       resultadoEncuesta = {
          id : this.encuesta.id,
          idEntidad : this.empresaCtrl.idEntidad,
          idEncuesta: this.encuesta.idEncuesta.id,
          periodo: this.periodo 
        }
        break;  
    
      default:
        break;
    }

   
    this.servicio.openSpinner();
    this.servicio.post("resultadoencuesta", resultadoEncuesta).subscribe(
      (result :any) =>{
       this.encuestasDetalle.forEach(e=>{
         e.idResultadoEncuesta =  result.id;
       })
       this.servicio.post('resultadoencuestaDetalle/preguntas',this.encuestasDetalle).subscribe(
         result => {console.log(result), this.servicio.closeSpinner(), this.finish.emit(), this.Toast.fire({type: 'success',title: 'Encuesta',text: 'Creada con exito!'}) },
         error =>{console.log(error), this.servicio.closeSpinner(), this.Toast.fire({type: 'error',title: 'Error',text: 'Al aplicar encuesta'})}
       )},
      error =>{console.log(error), this.servicio.closeSpinner(), this.Toast.fire({type: 'error',title: 'Error',text: 'Al aplicar encuesta'})}
    )
  }




  
  


}