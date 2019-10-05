import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { AppService } from 'src/app/services/app.service';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.scss"]
})
export class LoginComponent implements OnInit {
  public datos: FormGroup;
  public Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  constructor(  private _formBuilder: FormBuilder, private servicio: AppService, private authService: AuthService, private spinner: NgxSpinnerService) { 
 
  }

  ngOnInit() {
    this.datos = this._formBuilder.group({
      'email': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])],
    });
  }


  login(){
    if(this.datos.valid){
      console.log(new Usuario(this.datos.controls['email'].value, this.datos.controls['password'].value));
      this.spinner.show();
        this.servicio.login(new Usuario(this.datos.controls['email'].value, this.datos.controls['password'].value)).subscribe(
          (result:any) =>{this.Toast.fire({type: 'success',title: `Bienvenido ${result.nombre} ${result.apellido}`}); this.authService.guardarUsuario(result.access_token);this.spinner.hide();},
          error =>{if(error.status === 400){this.Toast.fire({type: 'error',title: 'Credenciales incorrectas'})};this.spinner.hide();}
          
          );
    }else{
      this.Toast.fire({type: 'error',title: 'Resvise los campos'});
      Object.keys(this.datos.controls).forEach(controlName => this.datos.controls[controlName].markAsTouched());

        } 
    }


}