import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AppService } from '../services/app-service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, OnInit {

  public usuario: any;

  constructor(private auth: AuthService, private router: Router, private servicio: AppService) { }

  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this.auth.isAuthenticated()) {
        if (this.isTokenExpired()) {
          this.auth.logout();
          this.router.navigate(['login']);
          return false;
        }

        if(this.isAdmin()){
          return true;
        }
      }
      this.router.navigate(['login']);
      return false;
    }



    isAdmin(): boolean {
      let token = sessionStorage.getItem('token');
      let payload = this.servicio.getDataUser();
      if(payload.roles[0] == "ROLE_ADMIN"){
        return true; 
      }
      return false;
    }



  isTokenExpired(): boolean {
    let token = sessionStorage.getItem('token');
    let payload = this.auth.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    if (payload.exp < now) {
      return true;
    }
    return false;
  }
}