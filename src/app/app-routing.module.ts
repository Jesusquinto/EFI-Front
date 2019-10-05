import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from '@angular/router';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { GuestGuard } from './guards/guest.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';


export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: "",
        component: GuestLayoutComponent,
        children: [
          {
            path: "",
            loadChildren:
              "./layouts/guest-layout/guest-layout.module#GuestLayoutModule"
          }
        ],
        canActivate: [GuestGuard]

    }, 

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

    {
        path: "",
        component: UserLayoutComponent,
        children: [
          {
            path: "",
            loadChildren:
              "./layouts/user-layout/user-layout.module#UserLayoutModule"
          }
        ],
        canActivate: [UserGuard]

    }, 

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
export class AppRoutingModule { }
