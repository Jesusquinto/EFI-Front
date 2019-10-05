import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: "app-panel",
  templateUrl: "panel.component.html",
  styleUrls: ["panel.component.scss"]
})
export class PanelComponent implements OnInit {
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