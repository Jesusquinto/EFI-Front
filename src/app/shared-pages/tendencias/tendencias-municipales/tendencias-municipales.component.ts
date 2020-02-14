import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/services/app.service';
import { getOptions } from 'src/app/shared-pages/tendencias/tendencias-municipales/options';

@Component({
  selector: 'app-tendencias-municipales',
  templateUrl: 'tendencias-municipales.component.html',
  styleUrls: ['tendencias-municipales.component.scss']
})
export class tendenciasMunicipalesComponent implements OnInit {


  public grupo: any;

  @Input('grupoChange')
  set grupoChange(value: any) {
    this.grupo = value;
    this.getEntidades();
}

  public periodos: any;
  public periodo: any;
  public periodoFilterCtrl: any;

  public municipio;
  public municipios: any;
  public municipioFilterCtrl: any;

  public departamento: any;
  public departamentos: any;
  public departamentoFilterCtrl: any;

  public variables: any;
  public variable: any;

  public chartData: any;

  public options: any;


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
    this.municipioFilterCtrl = '';

  }

  ngOnInit() {

    this.getEntidades();

  }

  getEntidades() {
    this.servicio.openSpinner();
    this.servicio.get('list/departamentos').subscribe(
      result => { console.log(result), this.servicio.closeSpinner(), this.departamentos = result,
                this.departamento = this.departamentos[0], this.getMunicipios(); },
      error => {console.log(error), this.servicio.closeSpinner(); }
    );
  }


  getMunicipios() {
    this.servicio.openSpinner();
    this.servicio.get('list/municipios/departamento/' + this.departamento.idEntidad).subscribe(
      result => {console.log(result), this.servicio.closeSpinner(), this.municipios = result,
                this.municipio = this.municipios[0], this.getPeriodos(); },
      error => {console.log(error), this.servicio.closeSpinner(); }
    );
  }


  getPeriodos() {
    this.servicio.openSpinner();
    this.servicio.get('calendario/periodos').subscribe(
      result => { console.log(result), this.servicio.closeSpinner();
                  this.periodos = result, this.periodo = this.periodos[0]; this.getVariables(); },
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





getHistoricosByMunicipio() {
  this.servicio.openSpinner();
  this.servicio.get('indicadorcuentas/historicos/' + this.variable.idVariable + '/'
                     + this.municipio.codigoChip + '/' + this.periodo[0]).subscribe(
    (result: any) => {console.log(result), this.servicio.closeSpinner();
                      this.chartData = {
                              labels: [],
                              datasets: []
                        };
                      const data = this.getData(result);
                      console.log('DATA: ', data);
                      data.forEach(e => {
                        this.chartData.labels.push(e.anno);
                      });
                      let dataSets: Array<any>;
                      dataSets = new Array();


                      if (data.length > 0) {
                        let flag = 0;
                        data[0].data.forEach(e => {
                          if (flag === 0) {
                            dataSets.push({
                              label: e.nombre,
                              data: [],
                              fill: false,
                              borderColor: this.variable.css,
                              backgroundColor: this.variable.css,
                          });
                          } else {
                            dataSets.push({
                              label: e.nombre,
                              data: [],
                              fill: false,
                              borderColor: e.color,
                              backgroundColor: e.color
                          });
                          }
                          flag += 1;
                    });
                        console.log('DATA SETS', dataSets);
                        this.options = getOptions(dataSets);

                        for (let i = 0; i < dataSets.length; i++) {
                      data.forEach(e => {
                          dataSets[i].data.push(e.data[i].valor.split('.').join(''));
                      });
                    }
                        this.chartData.datasets = dataSets;
                      } else {
                        this.chartData = null;
                      }
                      console.log(this.chartData);

              },
    error => {console.log(error), this.servicio.closeSpinner();}
  );
}


setVariable(variable: any) {
  this.variable = variable;
  this.getHistoricosByMunicipio();
}



  setDepartamento() {
    this.getMunicipios();
  }

  setMunicipio() {
    this.getHistoricosByMunicipio();
  }
  setPeriodo() {
    this.getHistoricosByMunicipio();
  }




  getData(result: any): any {
    if (result != null) {
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
        datos.push({ nombre : key.key, valor : historico.data[key.key], color: key.color});
      });
      historico.data = datos;
      result[i] = historico;
      }
    } else {result  = []; }
    return result;
  }





}
