import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: "app-encuestas-realizadas",
  templateUrl: "encuestas-realizadas.component.html",
  styleUrls: ["encuestas-realizadas.component.scss"]
})
export class EncuestasRealizadasComponent implements OnInit {
  public estado: any;
  public encuesta: any;
 
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
    this.estado = 'ver-encuestas'
    
  }

  ngOnInit() {
    
  }




  editarEncuesta(e){
    this.estado = 'editar-encuesta';
    this.encuesta = e;
  }
 

  finalizarEdicion(){
    this.estado = 'ver-encuestas';
    this.Toast.fire({type: 'success',title: 'Encuesta',text: 'Editada con exito!'})
  }


 

  


  
  


}