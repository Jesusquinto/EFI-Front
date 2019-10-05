import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanCuentaComponent } from './plan-cuenta.component';
import { PlanCuentaFormComponent } from './plan-cuenta-form/plan-cuenta-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

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
    SharedModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[
    PlanCuentaFormComponent
  ]
})
export class PlanCuentaModule { }
