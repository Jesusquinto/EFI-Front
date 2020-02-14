import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: "app-indicadores",
  templateUrl: "indicadores.component.html",
  styleUrls: ["indicadores.component.scss"]
})
export class IndicadoresComponent implements OnInit {

  public indicadores: any;

  public grupo: any; 
  public grupos: any;

  public dataTipo: any;

  public tipos:any;
  public tipo: any;
  public encuesta: any;

  public tipoFilterCtrl: any;





  
 
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
    this.grupo = null;
    this.tipo = null;
    this.dataTipo = '',
    this.tipoFilterCtrl = '';
    
  }

  ngOnInit() {
    this.getTipos();
    
  }



  getTipos(){
    this.servicio.openSpinner();
    this.servicio.get("tipos").subscribe(
      result => {console.log("TIPOS ",result), this.servicio.closeSpinner(), this.tipos = result, this.setTipo(this.tipos[0].idTipoIndicador)},
      error => {console.log(error), this.servicio.closeSpinner()}
    ) 
  }

  getGruposInidicador(idTipo){
    this.servicio.openSpinner();
    this.servicio.get("grupos/indicador/".concat(idTipo)).subscribe(
      (result : any) => {console.log("GRUPOS :",result), this.servicio.closeSpinner();
    
          this.grupos = result;
          this.setGrupo(this.grupos[0])},

          
        
      error => {console.log(error), this.servicio.closeSpinner()}
    )

  }


  getIndicadoresByTipoAndGrupo(){
    this.servicio.openSpinner();
    this.servicio.get("indicadores/tipo/grupo/"+this.tipo+"/"+this.grupo.idGrupo).subscribe(
      result => { console.log("INDICADORES " ,result), this.servicio.closeSpinner(), this.indicadores = result; if(this.dataTipo == ''){this.dataTipo = 'departamento'}},
      error => {console.log(error), this.servicio.closeSpinner()}
    )
  }

  

  setGrupo(grupo){
    this.indicadores = null;
    let before = this.dataTipo;
    this.dataTipo = null;
    this.dataTipo = before;
      this.grupo = grupo;
      this.dataTipo = '';
      if(this.grupo){
        this.getIndicadoresByTipoAndGrupo();
      }else{
        this.indicadores = [];
      }

    
  }





  setTipo(tipo){
    console.log("TIPO ", tipo)
    this.tipo = tipo;
    this.indicadores = null;
    this.grupos = null;
    this.getGruposInidicador(tipo);
  }





  


  
  


}