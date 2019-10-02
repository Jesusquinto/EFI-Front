import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.auth.isAuthenticated()) {
        if (this.auth.isTokenExpired()) {
          return true;
        }
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    }
}
