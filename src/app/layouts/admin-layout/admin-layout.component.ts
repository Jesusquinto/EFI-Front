import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {

  constructor() {}

  
  ngOnInit() { 
    var body = document.getElementsByTagName('body')[0]; body.classList.add("white-content");
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];
    sidebar.setAttribute('data',"blue");
    mainPanel.setAttribute('data',"blue");
  }
}
