import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from '../../pages/login/login.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialImports } from 'src/app/imports/material-imports.import';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ComponentsModule,
    MaterialImports
    
  ],
  declarations: [
    LoginComponent,
  ]
})
export class AuthLayoutModule { }
