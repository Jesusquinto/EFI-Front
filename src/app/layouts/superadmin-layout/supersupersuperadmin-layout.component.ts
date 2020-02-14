import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-supersupersuperadmin-layout",
  templateUrl: "./supersupersuperadmin-layout.component.html",
  styleUrls: ["./supersupersuperadmin-layout.component.scss"]
})
export class SuperadminLayoutComponent implements OnInit {

  constructor() {}

  
  ngOnInit() { 
    var body = document.getElementsByTagName('body')[0]; body.classList.add("white-content");
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];
    sidebar.setAttribute('data',"blue");
    mainPanel.setAttribute('data',"blue");
  }
}
