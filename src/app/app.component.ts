import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, RouterEvent } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { AuthService } from './services/auth.service';

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

  constructor(private _router: Router, location: PlatformLocation, private auth: AuthService) {
  

    this._router.events.subscribe((routerEvent: Event) => {

      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicatior = false;
        location.onPopState(() => {
          window.location.reload();
        });
        console.log(routerEvent.url.substring(routerEvent.url.lastIndexOf('/') + 1));
        this.currentUrl = routerEvent.url.substring(routerEvent.url.lastIndexOf('/') + 1);
      }

      if (
        this.currentUrl.trim() === 'login' ||
        this.currentUrl.trim() === 'main' ||
        this.currentUrl.trim() === 'demo') {
        document.getElementById('main-component').style["display"] = 'none';
      } else {
        document.getElementById('main-component').style.removeProperty('display');

     

      }
      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicatior = false;
      }
      window.scrollTo(0, 0)
    });
  }


  logout(){
    document.getElementById('main-component').style["display"] = 'none';
    this.auth.logout();
  }
}
