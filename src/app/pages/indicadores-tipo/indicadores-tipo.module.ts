import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndicadoresTipoComponent } from './indicadores-tipo.component';
import { IndicadoresTipoFormComponent } from './indicadores-tipo-form/indicadores-tipo-form.component';
import { MaterialImports } from 'src/app/imports/material-imports.import';

const routes: Routes = [
  {path: '', component: IndicadoresTipoComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [IndicadoresTipoComponent, IndicadoresTipoFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialImports
  ],
  entryComponents: [IndicadoresTipoFormComponent]
})

export class IndicadoresTipoModule { }
