import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import {AccordionModule} from 'primeng/accordion';   
import {ChartModule} from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
  { path: 'empresa', loadChildren: './empresa/empresa.module#EmpresaModule' },
  { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosModule' },
  { path: 'indicadores-tipo', loadChildren: './indicadores-tipo/indicadores-tipo.module#IndicadoresTipoModule' },
  { path: 'indicadores-grupo', loadChildren: './indicadores-grupo/indicadores-grupo.module#IndicadoresGrupoModule' },
  { path: 'indicadores-variables', loadChildren: './indicadores-variables/indicadores-variables.module#IndicadoresVariablesModule' },
  { path: 'plan-cuenta', loadChildren: './plan-cuenta/plan-cuenta.module#PlanCuentaModule' },
];

@NgModule({
  declarations: [ DashboardComponent],
  imports: [
    CommonModule,
    AccordionModule,
    RouterModule.forChild(routes),
    ChartModule,
    DialogModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ]
})

export class AdminLayoutModule { }
