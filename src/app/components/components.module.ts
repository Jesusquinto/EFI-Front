import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppComponent } from '../app.component';
import { ToastDefaults, SnotifyService } from 'ng-snotify';
import { DynamicScriptLoaderService } from '../dynamic-script-loader-service.service';
import { AppSettings } from '../settings/app.settings';



@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule
  ],
  exports: [NavBarComponent],
  bootstrap: [AppComponent],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    SnotifyService,
    DynamicScriptLoaderService,
    AppSettings
  ]


})
export class ComponentsModule { }
