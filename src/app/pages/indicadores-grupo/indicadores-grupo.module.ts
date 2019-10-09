import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicadoresGrupoComponent } from './indicadores-grupo.component';
import { IndicadoresGrupoFormComponent } from './indicadores-grupo-form/indicadores-grupo-form.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialImports } from 'src/app/imports/material-imports.import';

export const routes: Routes = [
  { path: '', component: IndicadoresGrupoComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    IndicadoresGrupoComponent,
    IndicadoresGrupoFormComponent
  ],
  imports: [
    CommonModule,
    MaterialImports,
    RouterModule.forChild(routes)
  ],
  entryComponents:[
    IndicadoresGrupoFormComponent
  ]
})
export class IndicadoresGrupoModule { }

