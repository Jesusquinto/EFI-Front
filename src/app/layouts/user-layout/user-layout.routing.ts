import { Routes } from "@angular/router";
import { PanelComponent } from 'src/app/pages/panel/panel.component';
import { AplicarEncuestaComponent } from 'src/app/pages/aplicar-encuesta/aplicar-encuesta.component';


// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const UserLayoutRoutes: Routes = [
  
  { path: "panel", component: PanelComponent },
  { path: "aplicar-encuesta", component: AplicarEncuestaComponent }

  // { path: "rtl", component: RtlComponent }
];
