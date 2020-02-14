import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanCuentaComponent } from './plan-cuenta.component';
import { PlanCuentaFormComponent } from './plan-cuenta-form/plan-cuenta-form.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialImports } from 'src/app/imports/material-imports.import';
import { PipesModule } from 'src/app/pipes/pipes.module';


export const routes: Routes = [
  { path: '', component: PlanCuentaComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    PlanCuentaComponent,
    PlanCuentaFormComponent
  ],
  imports: [
    CommonModule,
    MaterialImports,
    RouterModule.forChild(routes),
    PipesModule
  ],
  entryComponents:[
    PlanCuentaFormComponent
  ]
})
export class PlanCuentaModule { }
