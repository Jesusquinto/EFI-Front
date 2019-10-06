import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { Endpoints } from './endpoints';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
}) 
export class AppService {


  public url : any;
  public urlx: any;
 private token = '';
 private httpOptions;
 
 constructor(private http: HttpClient, private auth: AuthService, private router : Router, private spinner: NgxSpinnerService)
 {
  this.url = Endpoints.prefix;
  this.urlx = Endpoints.normal;
  this.getHeaders(); 
 }


 getHeaders(){
  this.token = sessionStorage.getItem('token');
  this.httpOptions = {headers: new HttpHeaders({  'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + this.token})};
 }

 getHeaders2(){
  this.token = sessionStorage.getItem('token');
  this.httpOptions = {headers: new HttpHeaders('multipart/*').append('Authorization', 'Bearer '+ this.token)};
 }





 clearSession(){
  this.auth.logout();
  swal.fire({
    title: 'Error!',
    text: 'Su sesion ha expirado',
    type: 'error'
  });
  this.spinner.hide();
  this.router.navigate(['/login']);
 }  



 //GET
  get(ruta:string)
  {
    if(this.auth.isAuthenticated()){let exp = this.auth.isTokenExpired(); if(!exp){ this.getHeaders();return this.http.get<any>(this.url.concat(ruta),this.httpOptions);} } 
    this.clearSession();
  }

  //POST
 post(ruta: string, body: any)
 {
  if(this.auth.isAuthenticated()){let exp = this.auth.isTokenExpired(); if(!exp){this.getHeaders();return this.http.post<any>(this.url.concat(ruta), body, this.httpOptions); }}
  this.clearSession();
 }

 //DELETE
 delete(ruta: string)
 {
  if(this.auth.isAuthenticated()){let exp = this.auth.isTokenExpired();if(!exp){ this.getHeaders(); return this.http.delete<any>(this.url.concat(ruta), this.httpOptions);}}
  this.clearSession();
 }

 //PUT
 put(ruta: string, body: any)
 { 
  if(this.auth.isAuthenticated()){let exp = this.auth.isTokenExpired();if(!exp){this.getHeaders();return this.http.put<any>(this.url.concat(ruta), body, this.httpOptions);}}
  this.clearSession();
 }




 login(usuario: Usuario): Observable<any> {
  const credenciales = btoa('angularapp' + ':' + '12345');
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + credenciales,
  });
  let params = new URLSearchParams();
  params.set('grant_type', 'password');
  params.set('username', usuario.usuario);
  params.set('password', usuario.password);
  console.log(params);

  return this.http.post<any>(this.urlx+'oauth/token', params.toString(), { headers: httpHeaders });
}











}