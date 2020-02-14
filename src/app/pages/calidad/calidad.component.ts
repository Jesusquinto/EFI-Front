import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: "app-calidad",
  templateUrl: "calidad.component.html",
  styleUrls: ["calidad.component.scss"]
})
export class CalidadComponent implements OnInit {

  public data: any;

  public municipioSelected: any;
  public calidad: Array<any>;
  public municipios:any;

  public departamento: any;
  public departamentos: any;
  public departamentoFilterCtrl: any;

  public periodos: Array<any>;
  public periodo: any;
  public periodoFilterCtrl: any;

  public years: any;
  public year: any;
  public yearFilterCtrl: any;
 
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
    this.periodos = new Array();
    this.calidad = new Array();
    this.periodoFilterCtrl = '';
    this.departamentoFilterCtrl = '';
    this.yearFilterCtrl = '';
  


    }

    
  




  ngOnInit() {
    this.getEntidades();
  }



  getEntidades(){
    this.servicio.openSpinner();
    this.servicio.get("list/departamentos").subscribe(
      result =>{ console.log(result), this.servicio.closeSpinner(), this.departamentos = result, this.departamento = this.departamentos[0], this.getYears(), this.getMunicipios()},
      error => {console.log(error), this.servicio.closeSpinner()}
    )
  }

  getPeriodos(){
    this.servicio.openSpinner();
    this.servicio.get("calendario/periodos").subscribe(
      (result : any) => { console.log(result), this.servicio.closeSpinner();
        let pe = new Array();
        result.forEach(p => {
            let periodo = {
              valor : p[0],
              nombre : p[1]
            }
            pe.push(periodo);
        });
        this.periodos = pe;
        console.log(this.periodos)
        this.periodo = this.periodos[0].valor},
      error => { console.log(error), this.servicio.closeSpinner()}
    )
  }


  getYears(){
    this.servicio.openSpinner();
    this.servicio.get("calendario/annos").subscribe(
      result => {console.log(result), this.servicio.closeSpinner(), this.years = result, this.year = this.years[0], this.getPeriodos()},
      error => {console.log(error), this.servicio.closeSpinner()}
    )
  }

  getMunicipios(){
    this.servicio.openSpinner();
    this.servicio.get("list/municipios/departamento/"+this.departamento.idEntidad).subscribe(
      result => {this.servicio.closeSpinner(), this.municipios = result},
      error => {this.servicio.closeSpinner(), console.log(error)}
    )
  }

  getCalidadFut(){
    this.servicio.openSpinner();
    this.servicio.get("calidadfut/"+this.departamento.idEntidad+"/"+this.periodo+"/"+this.year).subscribe(
      result => {this.servicio.closeSpinner(); console.log(result); this.data = result },
      error => {this.servicio.closeSpinner()}
    )
  }




  




  setPeriodo(e){
    console.log(e);
    console.log(this.periodos);
    this.periodo = e.value;
  }
  setDepartamento(e){
    this.departamento = e.value;
    this.getMunicipios();
  }

  setYear(e){
    this.year = e.value.toString();
    console.log(this.year);
  }


}