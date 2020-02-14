import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: "app-datos-municipales",
  templateUrl: "datos-municipales.component.html",
  styleUrls: ["datos-municipales.component.scss"]
})
export class datosMunicipalesComponent implements OnInit {

  @Input() public tipo: any;
  @Input() public grupo: any;

  public periodos: any;
  public periodo: any;
  public periodoFilterCtrl: any;
  
  public municipio;
  public municipios: any;
  public municipioFilterCtrl: any;

  public departamento: any;
  public departamentos: any;
  public departamentoFilterCtrl: any;

  public datos: any;
  public datosPeriodos : any;

  public dataPeriodos: any;

  public indicador: any;

  

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

  getEntidades(){
    this.servicio.openSpinner();
    this.servicio.get("list/departamentos").subscribe(
      result =>{ console.log(result), this.servicio.closeSpinner(), this.departamentos = result, this.departamento = this.departamentos[0], this.indicador = null, this.getMunicipios()},
      error => {console.log(error), this.servicio.closeSpinner()}
    )
  }


  getMunicipios(){
    this.servicio.openSpinner();
    this.servicio.get("list/municipios/departamento/"+this.departamento.idEntidad).subscribe(
      result =>{console.log(result), this.servicio.closeSpinner(), this.municipios = result, this.municipio = this.municipios[0], this.getPeriodos()},
      error => {console.log(error), this.servicio.closeSpinner()}
    )

  }

  getPeriodos(){
    this.servicio.openSpinner();
    this.servicio.get("list/periodos").subscribe(
      result => { console.log(result), this.servicio.closeSpinner(), this.periodos = result, this.periodo = this.periodos[0], this.getDatos()},
      error => { console.log(error), this.servicio.closeSpinner()}
    )
  }

  getDatos(){
    let municipio = this.municipio.codigoDane;
    console.log(municipio);
      this.servicio.openSpinner();
    this.servicio.get("indicadores/municipio/grupo/periodo/"+municipio+"/"+this.grupo.idGrupo+"/"+this.periodo).subscribe(
      result => {console.log(result), this.servicio.closeSpinner();this.datos = result;
          //this.indicador  ? this.indicador = this.indicador : this.indicador = this.datos[0] 
          if(this.datos[0]){this.indicador = this.datos[0];  this.getDatosPeriodos();};
        },
      error => {console.log(error), this.servicio.closeSpinner()}
    )
  
}

getDatosPeriodos(){
  this.servicio.openSpinner();
  this.servicio.get("indicadores/municipio/grupo/indicador/"+this.municipio.codigoDane+"/"+this.grupo.idGrupo+"/"+this.indicador.datosIndicadoresPK.tipo).subscribe(
    result => {console.log(result), this.servicio.closeSpinner(), this.datosPeriodos = result,
      this.dataPeriodos = {
        labels: [],
        datasets: [
            {
                label: this.indicador.nombreTipo,
                data: [],
                fill: false,
                borderColor: '#ec4543',
                backgroundColor: '#ec4543'

            }            
        ]
      }
      this.datosPeriodos.forEach(e => {
        this.dataPeriodos.labels.push(e.datosIndicadoresPK.periodo);
        this.dataPeriodos.datasets[0].data.push(e.valor);
      });
    
      console.log(this.dataPeriodos)
      
    },
    error => {console.log(error), this.servicio.closeSpinner()}
  )
}



  setDepartamento(){
    this.getMunicipios();
  }

  setMunicipio(){
    this.getDatos();
  }
  setPeriodo(){
    this.getDatos();
  }

  setIndicador(e){
    this.indicador = e;
    console.log(e);
    this.getDatosPeriodos();
  }


 



}