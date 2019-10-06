import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialImports } from 'src/app/imports/material-imports.import';

export const routes: Routes = [
  { path: '', component: EmpresaComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    EmpresaComponent,
    EmpresaFormComponent
  ],
  imports: [
    CommonModule,
    MaterialImports,
    RouterModule.forChild(routes)
  ],
  entryComponents:[
    EmpresaFormComponent
  ]
})
export class EmpresaModule { }
