import { Routes } from "@angular/router";
import { PanelComponent } from 'src/app/pages/panel/panel.component';
import { AplicarEncuestaComponent } from 'src/app/pages/aplicar-encuesta/aplicar-encuesta.component';
import { EncuestasRealizadasComponent } from 'src/app/pages/encuestas-realizadas/encuestas-realizadas.component';
import { IndicadoresComponent } from 'src/app/shared-pages/indicadores/indicadores.component';


// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const UserLayoutRoutes: Routes = [
  
  { path: "panel", component: PanelComponent },
  { path: "aplicar-encuesta", component: AplicarEncuestaComponent },
  { path: "encuestas-realizadas", component: EncuestasRealizadasComponent},
  { path: "user-indicadores", component: IndicadoresComponent}
  // { path: "rtl", component: RtlComponent }
];
