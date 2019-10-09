import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntasComponent } from './preguntas.component';
import { PreguntasFormComponent } from './preguntas-form/preguntas-form.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialImports } from 'src/app/imports/material-imports.import';
import { PipesModule } from 'src/app/pipes/pipes.module';

export const routes: Routes = [
  { path: '', component: PreguntasComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    PreguntasComponent,
    PreguntasFormComponent
  ],
  imports: [
    CommonModule,
    MaterialImports,
    RouterModule.forChild(routes),
    PipesModule
  ],
  entryComponents:[
    PreguntasFormComponent
  ]
})
export class PreguntasModule { }
