import { Routes } from "@angular/router";
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';


// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  
  { path: "dashboard", component: DashboardComponent },

  // { path: "rtl", component: RtlComponent }
];
