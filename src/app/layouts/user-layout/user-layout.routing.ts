import { Routes } from "@angular/router";

import { EncuestaComponent } from './encuesta/encuesta.component';
import { PanelComponent } from './panel/panel.component';

// import { RtlComponent } from "../../pages/rtl/rtl.component";


export const UserLayoutRoutes: Routes = [
  
  { path: "encuesta", component: EncuestaComponent },
  { path: "panel", component: PanelComponent }



  // { path: "rtl", component: RtlComponent }
];
