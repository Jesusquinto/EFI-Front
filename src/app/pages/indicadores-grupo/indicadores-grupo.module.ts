import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicadoresGrupoComponent } from './indicadores-grupo.component';
import { IndicadoresGrupoFormComponent } from './indicadores-grupo-form/indicadores-grupo-form.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialImports } from 'src/app/imports/material-imports.import';
import { PipesModule } from 'src/app/pipes/pipes.module';

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
    RouterModule.forChild(routes),
    PipesModule
  ],
  entryComponents:[
    IndicadoresGrupoFormComponent
  ]
})
export class IndicadoresGrupoModule { }

