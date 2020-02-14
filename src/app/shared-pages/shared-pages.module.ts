import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';



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
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { datosDepartamentalesComponent } from './indicadores/datos-departamentales/datos-departamentales.component';
import { datosModalComponent } from './indicadores/datos-departamentales/datos-modal/datos-modal.component';
import { datosMunicipalesComponent } from './indicadores/datos-municipales/datos-municipales.component';
import { datosTableComponent } from './indicadores/datos-municipales/datos-table/datos-table.component';
import { AlertasComponent } from './alertas/alertas.component';
import { TendenciasComponent } from './tendencias/tendencias.component';
import { tendenciasDepartamentalesComponent } from './tendencias/tendencias-departamentales/tendencias-departamentales.component';
import { tendenciasMunicipalesComponent } from './tendencias/tendencias-municipales/tendencias-municipales.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MaterialImports,
    PerfectScrollbarModule,
    PipesModule,
    FileUploadModule,
    MatDialogModule
  ],
  declarations: [
    IndicadoresComponent,
    datosDepartamentalesComponent,
    datosModalComponent,
    datosMunicipalesComponent,
    datosTableComponent,
    AlertasComponent,
    TendenciasComponent,
    tendenciasDepartamentalesComponent,
    tendenciasMunicipalesComponent
        // RtlComponent
  ],

  exports : [
    IndicadoresComponent,
    TendenciasComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
  ],
  entryComponents:[]

})
export class SharedPagesModule {}
