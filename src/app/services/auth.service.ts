import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    public _usuario: any;
    public _token: string;

    constructor(private http: HttpClient, private router: Router) { }

    public setToken(token: any){
        sessionStorage.setItem('token', token);
    }

    public isTokenExpired(): boolean {
        const token = sessionStorage.getItem('token');
        const payload = this.obtenerDatosToken(token);
        const now = new Date().getTime() / 1000;
        if (payload.exp < now) {
            return true;
        }
        return false;
    }

    public obtenerDatosToken(token: string): any {
        if (token != null) {
            return JSON.parse(atob(token.split('.')[1]));
        }
        return null;
    }

    public isAuthenticated(): boolean {
        const token = sessionStorage.getItem('token');
        const payload = this.obtenerDatosToken(token);
        if (payload != null && payload.user_name && payload.user_name.length > 0) {
            return true;
        }
        return false;
    }

    public hasRole(role: any): boolean {
        if (this._usuario != null && this._usuario.roles != null && this._usuario.roles.includes(role)) {
            return true;
        }
        return false;
    }

    public logout(): void {
        this._token = null;
        this._usuario = null;
        sessionStorage.removeItem('token');
        sessionStorage.clear();
        this.router.navigate(['authentication/signin']);
    }
}
