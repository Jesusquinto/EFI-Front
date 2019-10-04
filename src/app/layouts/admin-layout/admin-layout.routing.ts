import { Routes } from "@angular/router";
import { EmpresaComponent } from './empresa/empresa.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// import { RtlComponent } from "../../pages/rtl/rtl.component";


export const AdminLayoutRoutes: Routes = [
  
  { path: "dashboard", component: DashboardComponent },
  { path: "empresa", component: EmpresaComponent },



  // { path: "rtl", component: RtlComponent }
];
