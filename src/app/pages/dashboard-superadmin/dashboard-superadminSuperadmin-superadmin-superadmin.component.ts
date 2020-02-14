import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { AppService } from 'src/app/services/app.service';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: "app-dashboard-superadminSuperadmin-superadmin-superadmin",
  templateUrl: "dashboard-superadminSuperadmin-superadmin-superadmin.component.html",
  styleUrls: ["dashboard-superadminSuperadmin-superadmin-superadmin.component.scss"]
})
export class DashboarSuperadminSuperadminComponent implements OnInit {
  public Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  constructor( ) { 
 
  }

  ngOnInit() {
   
  }


  


}