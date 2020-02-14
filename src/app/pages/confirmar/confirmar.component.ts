import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'src/app/services/app.service';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-confirmar",
  templateUrl: "confirmar.component.html",
  styleUrls: ["confirmar.component.scss"]
})
export class ConfirmarComponent implements OnInit {

  private idResultadoEncuesta: any;
  private idResponsable: any;
 
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

  constructor(private servicio: AppService, private router: Router , private route: ActivatedRoute) { 
    this.servicio.openSpinner();
  }




  ngOnInit() {
    this.servicio.openSpinner();

      this.route.paramMap.subscribe(params => {

      if(params.get('idResultadoEncuesta') == 'usuarioefi'){
        this.idResultadoEncuesta = params.get("idResponsable");
        this.servicio.confirmar('confirmar/usuarioefi/'.concat(this.idResultadoEncuesta)).subscribe(
          (result : any) => {console.log(result), this.servicio.closeSpinner();
            
            this.swalWithBootstrapButtons.fire(
              'Perfecto!',
              result.mensaje,
              'success'
            ).then( result =>{
              this.router.navigate(['login']);
            });
          
          },
          error => {
            console.log(error), this.servicio.closeSpinner();
              this.swalWithBootstrapButtons.fire(
            'Ocurrió un error',
            error.error.mensaje,
            'error'
          ).then( result =>{
            this.router.navigate(['login']);
          });   
          }
        )


      
      }else{
            
      this.idResultadoEncuesta = params.get("idResultadoEncuesta");
      this.idResponsable = params.get('idResponsable');
  

        console.log(this.idResultadoEncuesta);
        console.log(this.idResponsable);


        this.servicio.confirmar('confirmar/'+this.idResultadoEncuesta+'/'+this.idResponsable).subscribe(
          (result : any) => {console.log(result), this.servicio.closeSpinner();
             this.swalWithBootstrapButtons.fire(
            'Perfecto!',
            result.mensaje,
            'success'
          ).then( result =>{
            this.router.navigate(['login']);
          });
          },
          error => {console.log(error), this.servicio.closeSpinner();
              this.swalWithBootstrapButtons.fire(
            'Ocurrió un error',
            error.error.mensaje,
            'error'
          ).then( result =>{
            this.router.navigate(['login']);
          });          
          }
        )
      }  
  

    })



  }






}