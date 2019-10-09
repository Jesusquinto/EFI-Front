import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestaComponent } from './encuesta.component';
import { EncuestaFormComponent } from './encuesta-form/encuesta-form.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialImports } from 'src/app/imports/material-imports.import';
import { PipesModule } from 'src/app/pipes/pipes.module';
import {OverlayPanelModule} from 'primeng/overlaypanel';

export const routes: Routes = [
  { path: '', component: EncuestaComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    EncuestaComponent,
    EncuestaFormComponent
  ],
  imports: [
    CommonModule,
    MaterialImports,
    RouterModule.forChild(routes),
    PipesModule,
    OverlayPanelModule
  ],
  entryComponents:[
    EncuestaFormComponent
  ]
})
export class EncuestaModule { }
