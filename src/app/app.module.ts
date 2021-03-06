import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule, routes } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ConfirmarComponent } from './pages/confirmar/confirmar.component';
import { SuperadminLayoutComponent } from './layouts/superadmin-layout/supersupersuperadmin-layout.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule.forRoot(routes,{
      useHash: false
    }),
    AppRoutingModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  declarations: [AppComponent, UserLayoutComponent, AuthLayoutComponent, AdminLayoutComponent, ConfirmarComponent, SuperadminLayoutComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
