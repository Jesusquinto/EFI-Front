import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from '@angular/router';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';


export const routes: Routes = [


    {
        path: "guest",
        component: GuestLayoutComponent,
        children: [
          {
            path: "",
            loadChildren:
              "./layouts/guest-layout/guest-layout.module#GuestLayoutModule"
          }
        ]
      }, 



 /*    {
        path: 'empresa',
        loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    }, */
  /*   {
        path: 'email',
        loadChildren: () => import('./email/email.module').then(m => m.EmailModule)
    },
    {
        path: 'apps',
        loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
    },
    {
        path: 'widget',
        component: WidgetComponent
    },
    {
        path: 'ui',
        loadChildren: () => import('./ui/ui.module').then(m => m.UiModule)
    },
    {
        path: 'forms',
        loadChildren: () => import('./forms/forms.module').then(m => m.FormModule)
    },
    {
        path: 'tables',
        loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
    },
    {
        path: 'media',
        loadChildren: () => import('./media/media.module').then(m => m.MediaModule)
    },
    {
        path: 'charts',
        loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
    },
    {
        path: 'timeline',
        loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
    },
    {
        path: 'icons',
        loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)
    },
    {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
        path: 'extra-pages',
        loadChildren: () => import('./extra-pages/extra-pages.module').then(m => m.ExtraPagesModule)
    },
    {
        path: 'maps',
        loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
    }, */
    {
        path: '',
        redirectTo: 'guest',
        pathMatch: 'full'
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
