import { Routes } from "@angular/router";
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'empresa', loadChildren: '../admin-layout/empresa/empresa.module#EmpresaModule' }

];
