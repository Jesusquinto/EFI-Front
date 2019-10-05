import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, RouterEvent } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUrl: string;
  showLoadingIndicatior = true;
  public user: any;
  public show = true;
  public menu = 0;

  constructor(private _router: Router) {
    

  }
}
