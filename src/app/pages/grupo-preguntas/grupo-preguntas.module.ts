import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoPreguntasComponent } from './grupo-preguntas.component';
import { GrupoPreguntasFormComponent } from './grupo-preguntas-form/grupo-preguntas-form.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialImports } from 'src/app/imports/material-imports.import';

export const routes: Routes = [
  { path: '', component: GrupoPreguntasComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    GrupoPreguntasComponent,
    GrupoPreguntasFormComponent
  ],
  imports: [
    CommonModule,
    MaterialImports,
    RouterModule.forChild(routes)
  ],
  entryComponents:[
    GrupoPreguntasFormComponent
  ]
})
export class GrupoPreguntasModule { }
