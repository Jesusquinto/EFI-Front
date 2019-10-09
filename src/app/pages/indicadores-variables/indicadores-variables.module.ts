import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicadoresVariablesComponent } from './indicadores-variables.component';
import { IndicadoresVariablesFormComponent } from './indicadores-variables-form/indicadores-variables-form.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialImports } from 'src/app/imports/material-imports.import';

export const routes: Routes = [
  { path: '', component: IndicadoresVariablesComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    IndicadoresVariablesComponent,
    IndicadoresVariablesFormComponent
  ],
  imports: [
    CommonModule,
    MaterialImports,
    RouterModule.forChild(routes)
  ],
  entryComponents:[
    IndicadoresVariablesFormComponent
  ]
})
export class IndicadoresVariablesModule { }
