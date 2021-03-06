import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { UserLayoutRoutes } from "./user-layout.routing";

// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MaterialImports } from 'src/app/imports/material-imports.import';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PipesModule } from 'src/app/pipes/pipes.module';
import {FileUploadModule} from 'primeng/fileupload';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { PanelComponent } from 'src/app/pages/panel/panel.component';
import { AplicarEncuestaComponent } from 'src/app/pages/aplicar-encuesta/aplicar-encuesta.component';
import { VerEncuestasComponent } from 'src/app/pages/aplicar-encuesta/ver-encuestas/ver-encuestas.component';
import { HacerEncuestaComponent } from 'src/app/pages/aplicar-encuesta/hacer-encuesta/hacer-encuesta.component';
import { EncuestasRealizadasComponent } from 'src/app/pages/encuestas-realizadas/encuestas-realizadas.component';
import { SharedPagesModule } from 'src/app/shared-pages/shared-pages.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { VerResponsablesComponent } from 'src/app/pages/aplicar-encuesta/ver-responsables/ver-responsables.component';
import { CalidadComponent } from 'src/app/pages/calidad/calidad.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MaterialImports,
    PerfectScrollbarModule,
    PipesModule,
    FileUploadModule,
    MatDialogModule,
    SharedPagesModule,
    ComponentsModule
  ],
  declarations: [
    PanelComponent,
    AplicarEncuestaComponent,
    VerEncuestasComponent,
    HacerEncuestaComponent,
    EncuestasRealizadasComponent,
    VerResponsablesComponent,
    CalidadComponent
    // RtlComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
  ],
  entryComponents:[VerResponsablesComponent]

})
export class UserLayoutModule {}
