import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private appService:AppService) { }

  ngOnInit() {
    console.log(this.appService.getDataUser());
  }

}
