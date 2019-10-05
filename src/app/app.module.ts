import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { DynamicScriptLoaderService } from './dynamic-script-loader-service.service';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AppSettings } from './settings/app.settings';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    GuestLayoutComponent,
    AdminLayoutComponent,
    UserLayoutComponent
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes,{
      useHash: true
    }),
    AppRoutingModule,
    SnotifyModule,
    NgxSpinnerModule
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    SnotifyService,
    DynamicScriptLoaderService,
    AppSettings
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
