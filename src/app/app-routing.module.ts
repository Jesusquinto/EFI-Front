import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { UserLayoutComponent } from "./layouts/user-layout/user-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginGuard } from './guards/login.guard';
import { UserGuard } from './guards/user.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminGuard } from './guards/admin.guard';
import { ConfirmarComponent } from './pages/confirmar/confirmar.component';


export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },

  //ADMIN
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      }
    ],
    canActivate: [AdminGuard]
  }, 
  //AUTH  
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ],
    canActivate: [LoginGuard]
  },
  //USER
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/user-layout/user-layout.module#UserLayoutModule'
      }
    ],
    canActivate: [UserGuard]
  },
  {
    path: "confirmar/:idResultadoEncuesta/:idResponsable",
    component: ConfirmarComponent
  },

  //DEFAULT
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
