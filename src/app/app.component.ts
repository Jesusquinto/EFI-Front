import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, RouterEvent } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { AppService } from './services/app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUrl: string;
  showLoadingIndicatior = true;
  public user: any;

  constructor(private appService: AppService, private _router: Router, location: PlatformLocation) {
    console.log(this.appService.getDataUser());
    this.user = this.appService.getDataUser();

    this._router.events.subscribe((routerEvent: Event) => {

      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicatior = true;
        location.onPopState(() => {
          window.location.reload();
        });
        this.currentUrl = routerEvent.url.substring(routerEvent.url.lastIndexOf('/') + 1);
      }

      if (
        this.currentUrl.trim() === 'signin' ||
        this.currentUrl.trim() === 'signup' ||
        this.currentUrl.trim() === 'forgot-password' ||
        this.currentUrl.trim() === 'locked' ||
        this.currentUrl.trim() === 'page404' ||
        this.currentUrl.trim() === 'page500') {
        document.getElementById('main-component').style["display"] = 'none';
      } else {
        document.getElementById('main-component').style.removeProperty('display');

        switch (this.user.roles[0]) {
          case 'ROLE_USER':
            document.getElementById('menu-user').style.removeProperty('display');
            document.getElementById('menu-admin').style["display"] = 'none';
            break;
          case 'ROLE_ADMIN':
            document.getElementById('menu-admin').style.removeProperty('display');
            document.getElementById('menu-user').style["display"] = 'none';
            break;

          default:
            break;
        }

      }
      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicatior = false;
      }
      window.scrollTo(0, 0)
    });
  }
}
