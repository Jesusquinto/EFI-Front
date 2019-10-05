import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndicadoresTipoComponent } from './indicadores-tipo.component';
import { IndicadoresTipoFormComponent } from './indicadores-tipo-form/indicadores-tipo-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {path: '', component: IndicadoresTipoComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [IndicadoresTipoComponent, IndicadoresTipoFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  entryComponents: [IndicadoresTipoFormComponent]
})

export class IndicadoresTipoModule { }
