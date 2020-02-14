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

  public responsables: Array<any>;
  public responsableCtrl: any;
  public responsableFilterCtrl: any;

  public empresaCtrl: any;
  public empresaFilterCtrl: any;

  public encuestasDetalle: Array<any>;
  public encuestasDetalleSelected: any;

  public periodo: any;

  public estado: string;
  public observacion: any;

    public formulario: FormGroup;


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

  constructor(private servicio: AppService,  private _formBuilder: FormBuilder ) { 
    this.responsables = new Array();
    this.empresaFilterCtrl = '';
    this.responsableFilterCtrl = '';
    this.encuestasDetalle = [];
    this.estado = "mostrar-preguntas";
    this.observacion = '';
    
  }

  ngOnInit() {
      this.formulario = this._formBuilder.group({
      'nombre': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      'apellido': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      'identificacion': ['', Validators.compose([Validators.required,  Validators.maxLength(11), Validators.minLength(9)])],
      'telefono': ['', Validators.compose([Validators.required, Validators.maxLength(11), Validators.minLength(9)])],
      'correo': ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.email])],
      'cargo': ['', Validators.compose([Validators.required, Validators.maxLength(255)])],

    });


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
      (result : any) =>{this.servicio.closeSpinner(),console.log(result), this.preguntas = result, this.Toast.fire({type: 'success',title: 'Preguntas',text: 'Actualizadas con exito'}),this.setEncuestaDetalleEdit(), this.getEntidadesEdit(), this.getResponsables()},
      error => {this.servicio.closeSpinner(), console.log(error), this.Toast.fire({type: 'error',title: 'Error',text: 'Al consultar preguntas'});
      }
    )
  }

  getResponsables(){
    this.servicio.openSpinner();
    this.servicio.get('responsables/empresa/encuesta/'+this.encuesta.id).subscribe(
      (result : any) => {this.servicio.closeSpinner(), console.log(result), this.responsables = result },
      error => {this.servicio.closeSpinner(), console.log(error)}
    )
  }

 
  
  selectEncuestaDetalleIndex(e){
    this.encuestasDetalleSelected = e;
    this.estado = "mostrar-observacion";
    this.observacion = this.encuestasDetalle[e].observacion;
    this.Toast.fire({type: 'info',title: 'Pregunta '+this.preguntas[this.encuestasDetalleSelected].idPregunta.codigo,text: 'Seleccionada'})
  }

  selectEncuestaDetalleIndexResponsable(e){
    this.responsableCtrl = null;
        this.encuestasDetalleSelected = e;
        this.estado = "mostrar-responsable";
        console.log(this.encuestasDetalle)


        if(this.encuestasDetalle[e].idResponsable != null){
          for (let i = 0; i < this.responsables.length; i++) {
            console.log(this.responsables[i])
            if(this.responsables[i].identificacion == this.encuestasDetalle[e].idResponsable.identificacion){
              this.responsableCtrl = this.responsables[i];
            }            
          }
        }
     this.Toast.fire({type: 'info',title: 'Pregunta '+this.preguntas[this.encuestasDetalleSelected].idPregunta.codigo,text: 'Seleccionada'})
  }


  crearResponsable(){

  

      for (let i = 0; i < this.responsables.length; i++) {
        if(this.responsables[i].identificacion == this.formulario.controls['identificacion'].value){
          this.Toast.fire({type: 'warning',title: 'Valide',text: ' Ya existe un responsable con esa identificación'})
          return;
        }
        
      }



 


    let responsable = {
      nombre : this.formulario.controls['nombre'].value,
      apellido : this.formulario.controls['apellido'].value,
      identificacion : this.formulario.controls['identificacion'].value,
      telefono : this.formulario.controls['telefono'].value,
      correo : this.formulario.controls['correo'].value,
      cargo : this.formulario.controls['cargo'].value,
      idEmpresa : null,
      resultadoEncuesta : this.encuesta.id
    }
    if(this.formulario.valid){
      if(this.tipo == 2){
          this.servicio.openSpinner();
      this.servicio.post('responsables/save', responsable).subscribe(
        (result: any) => {this.servicio.closeSpinner(), console.log(result), this.getResponsables(), this.estado = 'mostrar-preguntas';
              this.formulario.controls['nombre'].setValue('');
              this.formulario.controls['apellido'].setValue('');
              this.formulario.controls['identificacion'].setValue(null);
              this.formulario.controls['telefono'].setValue(null);
              this.formulario.controls['correo'].setValue('');
              this.formulario.controls['cargo'].setValue('');
             this.Toast.fire({type: 'success',title: 'Responsable '+ result.identificacion ,text: ' Creado correctamente'})      
      },
        error => {this.servicio.closeSpinner(), console.log(error)})
      }
      if(this.tipo == 1){
          this.responsables.push(responsable);
          this.estado = 'mostrar-preguntas';
          this.Toast.fire({type: 'success',title: 'Responsable '+ responsable.identificacion ,text: ' Creado correctamente'})   
      }
    }else{
      this.Toast.fire({type: 'error',title: 'Error',text: 'Debe completar todos los campos'})
    }
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
      this.estado = "mostrar-preguntas";
    
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
        this.estado = "mostrar-preguntas";
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
        idResultadoEncuesta : e.idResultadoEncuesta,
        idPregunta: e.idPregunta,
        resultado: e.resultado,
        observacion: e.observacion,
        seguimiento: e.seguimiento,
        fechaSeguimiento : e.fechaSeguimiento,
        idResponsable: e.idResponsable
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
          idPregunta: e.idPregunta,
          resultado: null,
          observacion: null,
          seguimiento: 1,
          fechaSeguimiento : null,
          idResponsable: null
          }
        this.encuestasDetalle.push(encuestaResultadoDetalle);
    })
    console.log(this.encuestasDetalle);
  }

   selectPreguntaResponsable(e){
     this.estado = 'mostrar-responsable';
     this.encuestasDetalleSelected = e;
     console.log(e);

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
      
      let pregunta;
      for (let e = 0; e < this.preguntas.length; e++) {
        if(this.preguntas[e].id == this.encuestasDetalle[i].idPregunta){
          pregunta = this.preguntas[e].idPregunta;
          break;
        }         
      }
      if(pregunta){
      console.log(pregunta)
      if(pregunta.responsable != 'NA'){
        if(this.encuestasDetalle[i].idResponsable == null){
        this.Toast.fire({type: 'error',title: 'Error',text: 'Debe asignar un responsable a las preguntas'})
        return;
        }
      }
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
          periodo: this.periodo,
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
    }

   
    this.servicio.openSpinner();
    console.log(resultadoEncuesta);
    this.servicio.post("resultadoencuesta", resultadoEncuesta).subscribe(
      (resultadoEncuesta :any) =>{
      if(this.tipo == 1){
        this.servicio.post('responsables/varios/save/'.concat(resultadoEncuesta.id), this.responsables).subscribe(
          (result: any) =>{
            this.encuestasDetalle.forEach(e =>{
              result.responsables.forEach(r =>{
                if(e.idResponsable){
                   if(e.idResponsable.identificacion == r.identificacion){
                      e.idResponsable = r;
                  }
                }
              })              
            })
            console.log(this.encuestasDetalle);
            this.encuestasDetalle.forEach(e=>{
              e.idResultadoEncuesta =  resultadoEncuesta;
            })

            this.servicio.post('resultadoencuestaDetalle/preguntas',this.encuestasDetalle).subscribe(
              result => {console.log(result), this.servicio.closeSpinner(),  this.finish.emit(), this.Toast.fire({type: 'success',title: 'Encuesta',text: 'Creada con exito!'}) },
              error =>{console.log(error), this.servicio.closeSpinner(), this.Toast.fire({type: 'error',title: 'Error',text: 'Al aplicar encuesta'})}
            )  

          },
          error =>{this.servicio.closeSpinner(), console.log(error)}
        )
      }

      if(this.tipo == 2){
           console.log(this.encuestasDetalle);
            this.encuestasDetalle.forEach(e=>{
              e.idResultadoEncuesta =  resultadoEncuesta;
            })

            this.servicio.post('resultadoencuestaDetalle/preguntas',this.encuestasDetalle).subscribe(
              result => {console.log(result), this.servicio.closeSpinner(), /* this.finish.emit() */ this.Toast.fire({type: 'success',title: 'Encuesta',text: 'Creada con exito!'}) },
              error =>{console.log(error), this.servicio.closeSpinner(), this.Toast.fire({type: 'error',title: 'Error',text: 'Al aplicar encuesta'})}
            )  
      }
    
    
    },
      error =>{console.log(error), this.servicio.closeSpinner(), this.Toast.fire({type: 'error',title: 'Error',text: 'Al aplicar encuesta'})}
    )
  }


  setResponsable(){
    if(this.responsableCtrl == '' || this.responsableCtrl == null){
      this.Toast.fire({type: 'error',title: 'Error',text: 'Debe seleccionar un responsable'});
      return;
    }
    this.encuestasDetalle[this.encuestasDetalleSelected].idResponsable = this.responsableCtrl;
    this.Toast.fire({type: 'success',title: 'Pregunta '+this.preguntas[this.encuestasDetalleSelected].idPregunta.codigo,text: 'Responsable agregado con exito'})
    this.estado = 'mostrar-preguntas'
    this.responsableCtrl = null;
    console.log(this.encuestasDetalle);
  }





  
  


}