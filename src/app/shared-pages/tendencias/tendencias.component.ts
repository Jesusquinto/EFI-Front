import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: "app-tendencias",
  templateUrl: "tendencias.component.html",
  styleUrls: ["tendencias.component.scss"]
})
export class TendenciasComponent implements OnInit {



  public grupos: any;
  public grupo: any;
  public dataTipo: string;


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

  constructor(private servicio: AppService) {
    this.dataTipo = 'departamento';
  }

  ngOnInit() {
    this.getGrupos();
  }


  getGrupos() {
    this.servicio.openSpinner();
    this.servicio.get('grupos/indicador/2').subscribe(
      (result: any) => {console.log('GRUPOS : ', result), this.servicio.closeSpinner();
                        this.grupos = result;
                        this.setGrupo(this.grupos[0]); },
      error => {console.log(error), this.servicio.closeSpinner(); }
    );
  }




  setGrupo(grupo: any) {
    this.grupo = grupo;
  }



}