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

  public options:any;
  public display: boolean;
  public data: any;

  public municipioSelected: any;
  public alertas: Array<any>;
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

  public keys: any;

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
    this.alertas = new Array();
    this.periodoFilterCtrl = '';
    this.departamentoFilterCtrl = '';
    this.yearFilterCtrl = '';
    this.keys = new Array();
  


    }



  showDialog(){
    this.display = true;
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


  getAlertas(){
    this.alertas = new Array();
    this.servicio.openSpinner();
    this.servicio.post("alertas/codigochip/ano/mes/"+this.departamento.codigoChip+"/"+this.year+"/"+this.periodo, this.municipios).subscribe(
      result =>{this.servicio.closeSpinner(), console.log(result), this.setAlertas(result)},
      error => {this.servicio.closeSpinner(), console.log(error)}
    )
  }

  setAlertas(e) {
    console.log('DATOS', e)
    let data = new Array();
    e.forEach((i : Array<any>) => {
        if (typeof i !== 'undefined' && i.length > 0) {
              data.push(i);
          }
    });
    let municipios = new Array();
    data.forEach( e =>{
      let municipio = {
        codigoChip : e[2],
        entidad : e[1],
        alertas : new Array()
      }
      e.forEach((i : Array<any>)=> {
        municipio.codigoChip = i[2];
        municipio.entidad = i[1];
        let valor = {
          alerta : i[3],
          nombreAlerta : i[7],
          valor : i[6]
        }
        municipio.alertas.push(valor);
      });
      municipios.push(municipio);
    })


console.log("datosssss")
console.log(municipios);
  


  /*   data.forEach(e =>{
      let alerta = {
          entidad : null,
          codigoChip: null,
          c6r: null,
          fut1: null,
          fut2:null,
          fut3: null
        }
      e.forEach((i: Array<any>) => {
        alerta.entidad = i[1];
        alerta.codigoChip = i[2]
        switch (i[3]) {
          case 'K21':
            alerta.c6r = i[6];
            break;
          case 'K13':
            alerta.fut1 = i[6];
            break;
          case 'K26':
            alerta.fut2 = i[6];
            break;
          case 'K6':
            alerta.fut3 = i[6];
            break;           
        }
    });
    this.alertas.push(alerta);

  }); */

    this.alertas = municipios;
    console.log(this.alertas);
  }

  verDatos(e){
    this.municipioSelected = e;
    this.servicio.openSpinner();
    this.showDialog();
    this.servicio.get('alertasdatos/codigochip/ano/mes/'+e.codigoChip+'/'+this.year+'/'+this.periodo).subscribe(
      (result:any) => {this.servicio.closeSpinner(), console.log(result), this.data = result      },
      error => {this.servicio.closeSpinner(), console.log(error)}
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