import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: "app-alertas",
  templateUrl: "alertas.component.html",
  styleUrls: ["alertas.component.scss"]
})
export class AlertasComponent implements OnInit {

  public departamento: any;
  public departamentos: any;
  public departamentoFilterCtrl: any;

  public periodos: any;
  public periodo: any;
  public periodoFilterCtrl: any;
 
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
 
  }




  ngOnInit() {
    this.getEntidades();
  }



  getEntidades(){
    this.servicio.openSpinner();
    this.servicio.get("list/departamentos").subscribe(
      result =>{ console.log(result), this.servicio.closeSpinner(), this.departamentos = result, this.departamento = this.departamentos[0], this.getPeriodos()},
      error => {console.log(error), this.servicio.closeSpinner()}
    )
  }

  getPeriodos(){
    this.servicio.openSpinner();
    this.servicio.get("calendario/periodos").subscribe(
      result => { console.log(result), this.servicio.closeSpinner(), this.periodos = result, this.periodo = this.periodos[0]},
      error => { console.log(error), this.servicio.closeSpinner()}
    )
  }

}