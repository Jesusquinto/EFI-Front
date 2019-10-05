import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../../components/sidebar/sidebar.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {


  constructor(private router: Router, private modalService: NgbModal) { }

  
  ngOnInit() {
    var body = document.getElementsByTagName('body')[0]; body.classList.add("white-content");


    
    }

  }