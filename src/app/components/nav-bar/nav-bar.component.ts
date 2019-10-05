import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { AppService } from 'src/app/services/app-service';
import { AuthService } from 'src/app/services/auth.service';
import { AppSettings } from '../../settings/app.settings';
import { Settings } from '../../settings/app.settings.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() user;
  @Input() type;
  public usuario: any;
  public settings: Settings;

  constructor(private appSettings: AppSettings,private appService: AppService, private authService: AuthService) {
    this.usuario = this.appService.getDataUser();
    this.settings = this.appSettings.settings;
   }

  logout(){
    this.authService.logout();
  }

  ngOnInit() {

    $(".sidemenu-collapse").on("click", function() {
      var $body = $("body");
      if ($body.hasClass("side-closed")) {
        $body.removeClass("side-closed");
        $body.removeClass("submenu-closed");
      } else {
        $body.addClass("side-closed");
        $body.addClass("submenu-closed");
      }
    });
    $(".content, .navbar").mouseenter(function() {
      var $body = $("body");
      $body.removeClass("side-closed-hover");
      $body.addClass("submenu-closed");
    });
    $(".sidebar").mouseenter(function() {
      var $body = $("body");
      $body.addClass("side-closed-hover");
      $body.removeClass("submenu-closed");
    });
  
  }

}
