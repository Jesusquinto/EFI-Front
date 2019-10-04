import { Routes } from "@angular/router";
import { MainComponent } from './main/main.component';
import { DemoComponent } from './demo/demo.component';
import { LoginComponent } from './login/login.component';

// import { RtlComponent } from "../../pages/rtl/rtl.component";


export const GuestLayoutRoutes: Routes = [
  
  { path: "main", component: MainComponent },
  { path: "demo", component: DemoComponent },
  { path: "login", component: LoginComponent}


  // { path: "rtl", component: RtlComponent }
];
