import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'src/app/services/app.service';
import { MatGridTileHeaderCssMatStyler, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: "app-tendencias-departamentales",
  templateUrl: "tendencias-departamentales.component.html",
  styleUrls: ["tendencias-departamentales.component.scss"]
})
export class tendenciasDepartamentalesComponent implements OnInit {

  public grupo: any;

  @Input('grupoChange')
  set grupoChange(value: any) {
    this.grupo = value;
    this.getEntidades();
}

  public periodos: any;
  public periodo: any;
  public periodoFilterCtrl: any;

  public departamento: any;
  public departamentos: any;
  public departamentoFilterCtrl: any;

  public anno: any;
  public annos: any;
  public annoFilterCtrl: any;

  public variables: any;
  public variable: any;

  public historicos: any;

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
    this.departamentoFilterCtrl = '';
    this.periodoFilterCtrl = '';
    this.annoFilterCtrl = '';

  }

  ngOnInit() {
    this.getEntidades();
  }

  getEntidades() {
    this.servicio.openSpinner();
    this.servicio.get('list/departamentos').subscribe(
      result =>{ console.log('ENTIDADES: ', result), this.servicio.closeSpinner();
                 this.departamentos = result, this.departamento = this.departamentos[0], this.getAnnos(); },
      error => {console.log(error), this.servicio.closeSpinner(); }
    );
  }

  getAnnos() {
    this.servicio.openSpinner();
    this.servicio.get('calendario/annos').subscribe(
      result => {console.log(result), this.servicio.closeSpinner(), this.annos = result, this.anno = this.annos[0], this.getPeriodos(); },
      error => {console.log(error), this.servicio.closeSpinner(); }
    );
  }



  getPeriodos() {
    this.servicio.openSpinner();
    this.servicio.get('calendario/periodos').subscribe(
      result => { console.log(result), this.servicio.closeSpinner();
                  this.periodos = result, this.periodo = this.periodos[0]; this.getVariables() },
      error => { console.log(error), this.servicio.closeSpinner(); }
    );
  }

  getVariables() {
    this.servicio.openSpinner();
    this.servicio.get('indicadores/tipo/grupo/2/' + this.grupo.idGrupo).subscribe(
      result => {this.servicio.closeSpinner(); console.log(result), console.log(result[0].idVariable);
                 this.variables = result; this.setVariable(this.variables[0]); },
      error => {this.servicio.closeSpinner(); console.log(error); }
    );
  }

  getHistoricos() {
    this.historicos = null;
    this.servicio.openSpinner();
    this.servicio.get('indicadorcuentas/historicos/' + this.variable.idVariable + '/' + this.departamento.codigoChip + '/'
                      + this.departamento.idEntidad + '/' + this.anno + '/' + this.periodo[0]).subscribe(
      (result: any) => {this.servicio.closeSpinner();
                        this.historicos = this.getData(result);
                  },
      error => {this.servicio.closeSpinner(), console.log(error ); }
    );
  }




  setDepartamento() {
    this.getHistoricos();
    // this.getDatos();
  }
  setPeriodo() {
    this.getHistoricos();
    // this.getDatos();
  }

  setAnno() {
    this.getHistoricos();
  }


  setVariable(variable: any) {
    this.variable = variable;
    this.getHistoricos();
  }




  getData(result: any): any {
    if (result != null) {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
      const e = result[i];
      const historico = {
        idHistorico : e[0],
        codigoChip : e[1],
        anno : e[2],
        planCuenta : e[3],
        data : JSON.parse(e[4]),
        nombre : e[7],
        keys : JSON.parse(e[8])
      };
      let datos: any;
      datos = new Array();
      historico.keys.forEach(key => {
        datos.push({ nombre : key.key, valor : historico.data[key.key]});
      });
      historico.data = datos;
      result[i] = historico;


      }
    } else {result  = []; }
    return result;
  }






}