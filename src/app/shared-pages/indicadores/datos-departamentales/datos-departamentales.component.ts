import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: "app-datos-departamentales",
  templateUrl: "datos-departamentales.component.html",
  styleUrls: ["datos-departamentales.component.scss"]
})
export class datosDepartamentalesComponent implements OnInit {

  @Input() public indicadores: any;
  @Input() public tipo: any;
  @Input() public grupo: any;

  public periodos: any;
  public periodo: any;
  public periodoFilterCtrl: any;
  

  public departamento: any;
  public departamentos: any;
  public departamentoFilterCtrl: any;

  public indicador: any;


	public display : boolean;
  public alto: any;

  public datos: any;
  public data: any;
  public dataSeleccionada: any;

  options = {
		responsive: true,
		maintainAspectRatio: false,
		legend: {
			display : false
		},
		layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
		},
		scales: {
			yAxes: [{
			  ticks: {
				stepSize: 5,
        beginAtZero: true,
        fontSize: 10
        
			  }
			}]
		  }
	}


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
    this.alto = '400px';
    this.display = false;
  }

  ngOnInit() {
    console.log(this.indicadores);
    this.indicador = this.indicadores[0];
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
    this.servicio.get("list/periodos").subscribe(
      result => { console.log(result), this.servicio.closeSpinner(), this.periodos = result, this.periodo = this.periodos[0], this.getDatos()},
      error => { console.log(error), this.servicio.closeSpinner()}
    )
  }

  getDatos(){
    let codigoDepartamento = this.departamento.codigoDane.substring(0,2);
    console.log(codigoDepartamento);
    console.log(this.indicador)
    console.log("idGurpo", this.grupo.idGrupo)
    if(this.indicador){
      this.servicio.openSpinner();
    this.servicio.get("indicadores/departamento/grupo/periodo/indicador/"+codigoDepartamento+"/"+this.grupo.idGrupo+"/"+this.periodo+"/"+this.indicador.idVariable).subscribe(
      result => {console.log(result), this.servicio.closeSpinner();
        this.datos = result;      
        if(this.datos.length > 25){
					this.alto = '1500px';
				}else{
					this.alto = '400px';
				}
        this.data = {
          "labels" : [],
          "datasets": [{
                label: this.indicador.nombreVariable, 
                backgroundColor: this.indicador.css,
                borderColor: this.indicador.css,
                data: []
          }]
        }; 
          this.datos.forEach(e => {
            this.data.labels.push(e.nombreMunicipio);
            this.data.datasets[0].data.push(e.valor);
          });                        
      },
      error => {console.log(error), this.servicio.closeSpinner()}
    )
  }
}


  setDepartamento(){
    this.getDatos();
  }
  setPeriodo(){
    this.getDatos();
  }


  setIndicador(e){
    this.indicador = e;
    this.getDatos();
  }

  showDialog(){
    this.display = true;
}



  dataInfo(e : any){
    let data : any;
    this.datos.forEach(i => {
        if(i.nombreMunicipio === e.element._model.label){
            data = i;
        }
    });
    console.log(data);
    this.dataSeleccionada = data;
    this.showDialog();

  }

}