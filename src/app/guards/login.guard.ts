import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, OnInit {

  public usuario: any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.auth.isAuthenticated()) {
        if (this.isTokenExpired()) {
          return true;
        }



        switch (this.auth.obtenerDatosToken(this.auth.token).roles[0].nombre) {
          case 'ROLE_ADMIN':
              this.router.navigate(['/dashboard']);
            break;
            case 'ROLE_USER':
             this.router.navigate(['/panel']);
            break;
        }
        return false;
      }
      return true;
    }
    

  isTokenExpired(): boolean {
    let token = this.auth.token;
    let payload = this.auth.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    if (payload.exp < now) {
      return true;
    }
    return false;
  }
}