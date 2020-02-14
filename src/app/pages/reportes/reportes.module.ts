import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesComponent } from './reportes.component';
import { ReportesFormComponent } from './reportes-form/reportes-form.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialImports } from 'src/app/imports/material-imports.import';

export const routes: Routes = [
  { path: '', component: ReportesComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ReportesComponent,
    ReportesFormComponent
  ],
  imports: [
    CommonModule,
    MaterialImports,
    RouterModule.forChild(routes)
  ],
  entryComponents:[
    ReportesFormComponent
  ]
})
export class ReportesModule { }

