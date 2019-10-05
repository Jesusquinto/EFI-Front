import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { APP } from '../settings/const';
import { AppSettings } from '../settings/app.settings';
import { Settings } from '../settings/app.settings.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  public settings: Settings;
  public url;
  private httpOptions;
  public token = '';

  constructor(
    private auth: AuthService,
    private appSettings: AppSettings,
    private http: HttpClient,
    private router: Router) {
    this.getHeaders();
    this.url = APP.endpoints;
    this.settings = this.appSettings.settings;
  }

  private getHeaders() {
    this.token = sessionStorage.getItem('token');
    if (this.token == null || this.token === undefined || this.token === '') {
      this.router.navigate(['/login']);
    } else {
      this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token }) };
    }
  }

  //GET
  get(ruta: string) {
    if (this.auth.isAuthenticated()) {
      let exp = this.auth.isTokenExpired();
      if (!exp) {
        this.getHeaders(); return this.http.get<any>(this.url.urlBackP.concat(ruta), this.httpOptions);
      }
    }
    this.clearSession();
  }

  //POST
  post(ruta: string, body: any) {
    if (this.auth.isAuthenticated()) {
      let exp = this.auth.isTokenExpired();
      if (!exp) {
        this.getHeaders(); return this.http.post<any>(this.url.urlBackP.concat(ruta), body, this.httpOptions);
      }
    }
    this.clearSession();
  }

  //PUT
  put(ruta: string, body: any) {
    if (this.auth.isAuthenticated()) {
      let exp = this.auth.isTokenExpired();
      if (!exp) {
        this.getHeaders(); return this.http.put<any>(this.url.urlBackP.concat(ruta), body, this.httpOptions);
      }
    }
    this.clearSession();
  }

  //DELETE
  delete(ruta: string) {
    if (this.auth.isAuthenticated()) {
      let exp = this.auth.isTokenExpired();
      if (!exp) {
        this.getHeaders(); return this.http.delete<any>(this.url.urlBackP.concat(ruta), this.httpOptions);
      }
    }
    this.clearSession();
  }

  public goTo(ruta: string) {
    this.router.navigate([ruta]);
  }

  public openSpinner() {
    this.settings.loadingSpinner = true;
  }

  public closeSpinner() {
    this.settings.loadingSpinner = false;
  }

  public login(data: any): Observable<any> {
    const credenciales = btoa('angularapp' + ':' + '12345');
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales,
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', data.username);
    params.set('password', data.password);
    return this.http.post<any>(this.url.urlBack+'oauth/token', params.toString(), { headers: httpHeaders });
  }

  clearSession(): void {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  public getDataUser() {
    const token = sessionStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    const usuario: any = {};
    usuario.id = payload.id;
    usuario.nombre = payload.nombre;
    usuario.apellido = payload.apellido;
    usuario.email = payload.email;
    usuario.empresa = payload.empresa;
    usuario.username = payload.user_name;
    usuario.roles = payload.authorities;
    return usuario;
  }

  public showNavBar(){
    this.settings.navbar = true;
  }

  public hideNavBar(){
    this.settings.navbar = false;
  }
}
