import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias.component';
import { CategoriasFormComponent } from './categorias-form/categorias-form.component';
import { MaterialImports } from 'src/app/imports/material-imports.import';

const routes: Routes = [
  {path: '', component: CategoriasComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [CategoriasComponent, CategoriasFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialImports
  ],
  entryComponents: [CategoriasFormComponent]
})

export class CategoriasModule { }
