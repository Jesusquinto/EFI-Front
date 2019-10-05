import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicadoresVariablesComponent } from './indicadores-variables.component';
import { IndicadoresVariablesFormComponent } from './indicadores-variables-form/indicadores-variables-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

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
    SharedModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[
    IndicadoresVariablesFormComponent
  ]
})
export class IndicadoresVariablesModule { }
