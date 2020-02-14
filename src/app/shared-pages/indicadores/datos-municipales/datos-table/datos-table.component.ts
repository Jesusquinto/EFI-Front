import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: "app-datos-table",
  templateUrl: "datos-table.component.html",
  styleUrls: ["datos-table.component.scss"]
})
export class datosTableComponent implements OnInit {

  @Input() public indicadores: any;
  @Output() public setIndicador = new EventEmitter();
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
  }

  ngOnInit() {
    console.log("lele");
    console.log(this.indicadores)
    this.indicador = this.indicadores[0];
   
  }

  selectIndicador(e){
    this.indicador = e;
    this.setIndicador.emit(e);
  
  }

  


}