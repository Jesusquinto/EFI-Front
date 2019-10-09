import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasPreguntasComponent } from './categorias-preguntas.component';
import { CategoriasPreguntasFormComponent } from './categorias-preguntas-form/categorias-preguntas-form.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialImports } from 'src/app/imports/material-imports.import';

export const routes: Routes = [
  { path: '', component: CategoriasPreguntasComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    CategoriasPreguntasComponent,
    CategoriasPreguntasFormComponent
  ],
  imports: [
    CommonModule,
    MaterialImports,
    RouterModule.forChild(routes)
  ],
  entryComponents:[
    CategoriasPreguntasFormComponent
  ]
})
export class CategoriasPreguntasModule { }
