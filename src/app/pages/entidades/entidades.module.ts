import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntidadesComponent } from './entidades.component';
import { EntidadesFormComponent } from './entidades-form/entidades-form.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialImports } from 'src/app/imports/material-imports.import';

export const routes: Routes = [
  { path: '', component: EntidadesComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    EntidadesComponent,
    EntidadesFormComponent
  ],
  imports: [
    CommonModule,
    MaterialImports,
    RouterModule.forChild(routes)
  ],
  entryComponents:[
    EntidadesFormComponent
  ]
})
export class EntidadesModule { }
