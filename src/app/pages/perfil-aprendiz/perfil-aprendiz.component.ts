import { Component, OnInit } from "@angular/core";
import { AuthService } from 'src/app/services/auth.service';
import { AppService } from 'src/app/services/app.service';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-perfil-aprendiz",
  templateUrl: "perfil-aprendiz.component.html"
})
export class PefilAprendizComponent implements OnInit {
  public usuario: any;
  public Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  public ficha: any;
  constructor(private Usuario: AuthService, private servicio: AppService, private spinner: NgxSpinnerService) {this.usuario = Usuario.obtenerDatosUser(), console.log(this.usuario)}

  ngOnInit() {
    this.getFicha();
  }

  getFicha(){
    this.spinner.show();
    this.servicio.get('user/ficha').subscribe(result =>{this.ficha = result, this.spinner.hide()},
      error =>{ this.Toast.fire({ type: 'error', title: error.error.error.message  }), this.spinner.hide()});
  }

 

}
