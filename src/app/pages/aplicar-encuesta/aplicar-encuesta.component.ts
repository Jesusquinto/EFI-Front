import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: "app-aplicar-encuesta",
  templateUrl: "aplicar-encuesta.component.html"
})
export class AplicarEncuestaComponent implements OnInit {
  public encuesta: any;

  public estado;
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  public Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  public swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger',
      title: 'title2'
    },
    buttonsStyling: false,
  });

  constructor(private servicio: AppService ) { 
    this.estado = 'ver-encuestas';
  }

  ngOnInit() {

 
    
   
  }

  hacerEncuesta(encuesta: any){
    console.log(encuesta);
    this.encuesta = encuesta;
    this.estado = 'hacer-encuesta';
  }

  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }


  encuestaRealizada(){
    this.estado = 'ver-encuestas';
    this.encuesta = null;
  }



  


}