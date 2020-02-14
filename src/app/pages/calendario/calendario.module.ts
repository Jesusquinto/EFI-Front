import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './calendario.component';
import { CalendarioFormComponent } from './calendario-form/calendario-form.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialImports } from 'src/app/imports/material-imports.import';

export const routes: Routes = [
  { path: '', component: CalendarioComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    CalendarioComponent,
    CalendarioFormComponent
  ],
  imports: [
    CommonModule,
    MaterialImports,
    RouterModule.forChild(routes)
  ],
  entryComponents:[
    CalendarioFormComponent
  ]
})
export class CalendarioModule { }

