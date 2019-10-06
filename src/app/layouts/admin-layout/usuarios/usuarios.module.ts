import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { MaterialImports } from 'src/app/imports/material-imports.import';

const routes: Routes = [
  {path: '', component: UsuariosComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [UsuariosComponent, UsuariosFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialImports
  ],
  entryComponents: [UsuariosFormComponent]
})

export class UsuariosModule { }
