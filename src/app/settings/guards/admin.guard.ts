import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.auth.isAuthenticated()) {
        if (this.auth.isTokenExpired()) {
          this.auth.logout();
          this.router.navigate(['/authentication/signin']);
          return false;
        }
        return true;
      }
      this.router.navigate(['/authentication/signin']);
      return false;
    }
}