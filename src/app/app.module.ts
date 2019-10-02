import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WidgetComponent } from './widget/widget.component';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { DynamicScriptLoaderService } from './dynamic-script-loader-service.service';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AppService } from './services/app.service';
import { AppSettings } from './settings/app.settings';


@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SnotifyModule
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    SnotifyService,
    DynamicScriptLoaderService,
    AppService,
    AppSettings
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
