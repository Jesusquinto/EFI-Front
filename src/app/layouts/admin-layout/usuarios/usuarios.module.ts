import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {path: '', component: UsuariosComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [UsuariosComponent, UsuariosFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  entryComponents: [UsuariosFormComponent]
})

export class UsuariosModule { }
