import { Routes } from "@angular/router";
import {  } from 'src/app/pages/dashboard/dashboard.component';
import { DashboarSuperadminSuperadminComponent } from 'src/app/pages/dashboard-superadmin/dashboard-superadminSuperadmin-superadmin-superadmin.component';

export const SuperadminLayoutRoutes: Routes = [

  { path: 'panel', component: DashboarSuperadminSuperadminComponent },
  { path: 'empresa', loadChildren: '../../pages/empresa/empresa.module#EmpresaModule' },

];
