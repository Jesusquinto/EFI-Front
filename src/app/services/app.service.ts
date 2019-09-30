import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
}) 
export class AppService {

  public url = 'http://efidemoco.us-east-2.elasticbeanstalk.com/rest/v1/';
 private httpOptions;
 
 constructor(private http: HttpClient, private router : Router)
 {
  this.getHeaders(); 
 }


 getHeaders(){
  this.httpOptions = {headers: new HttpHeaders({  'Content-Type': 'application/json'})};
 }




 //GET
  get(ruta:string)
  {
    this.getHeaders();
    return this.http.get<any>(this.url.concat(ruta),this.httpOptions); 

  }

  //POST
 post(ruta: string, body: any)
 {
 this.getHeaders();
 return this.http.post<any>(this.url.concat(ruta), body, this.httpOptions);
 
 }

 //DELETE
 delete(ruta: string)
 {
  this.getHeaders();
   return this.http.delete<any>(this.url.concat(ruta), this.httpOptions);
 }

 //PUT
 put(ruta: string, body: any)
 { 
 this.getHeaders();
 return this.http.put<any>(this.url.concat(ruta), body, this.httpOptions);
 }






}