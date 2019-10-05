import { Component, OnInit } from "@angular/core";
import { AuthService } from 'src/app/services/auth.service';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}




export const ROUTESAPRENDIZ: RouteInfo[] = [
  {
    path: "/constancias",
    title: "Mis constancias",
    icon: "icon-components",
    class: ""
  },
  {
    path: "/perfil",
    title: "Mi perfíl",
    icon: "icon-single-02",
    class: ""
  },
 ];


 export const ROUTESINSTRUCTOR: RouteInfo[] = [
  {
    path: "/constancias-aprendices",
    title: "Constancias",
    icon: "icon-components",
    class: ""
  },
  {
    path: "/aprendices",
    title: "Aprendices",
    icon: "icon-components",
    class: ""
  },
  {
    path: "/perfil-instructor",
    title: "Mi perfíl",
    icon: "icon-single-02",
    class: ""
  },
 ];

 export let ROUTES: RouteInfo[] = [];





@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  username: string;
  rol: string;


  constructor(private usuario: AuthService) {}

  ngOnInit() {

    this.username = this.usuario.obtenerDatosUser().nombre.concat(' ').concat(this.usuario.obtenerDatosUser().apellido);

  
    switch (this.usuario.obtenerDatosUser().rol) {
      case 2:
        this.menuItems = ROUTESINSTRUCTOR.filter(menuItem => menuItem);
        ROUTES = ROUTESINSTRUCTOR;
        this.rol = 'Instructor';
        break;
      case 3:
        this.menuItems = ROUTESAPRENDIZ.filter(menuItem => menuItem);
         ROUTES = ROUTESAPRENDIZ;
         this.rol = 'Aprendíz';
         break;
      default:
        break;
    }

  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
