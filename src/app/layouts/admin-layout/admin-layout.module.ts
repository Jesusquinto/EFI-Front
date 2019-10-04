import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import {AccordionModule} from 'primeng/accordion';   
import {ChartModule} from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { ToastDefaults, SnotifyService } from 'ng-snotify';
import { DynamicScriptLoaderService } from 'src/app/dynamic-script-loader-service.service';
import { AppSettings } from 'src/app/settings/app.settings';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpresaComponent } from './empresa/empresa.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};





@NgModule({
  declarations: [EmpresaComponent, DashboardComponent],
  imports: [
    CommonModule,
    AccordionModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartModule,
    DialogModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    DropdownModule

  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ]
})
export class AdminLayoutModule { }
