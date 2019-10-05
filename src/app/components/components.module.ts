import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from '../app.component';
import { ToastDefaults, SnotifyService } from 'ng-snotify';
import { DynamicScriptLoaderService } from '../dynamic-script-loader-service.service';
import { AppSettings } from '../settings/app.settings';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
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
