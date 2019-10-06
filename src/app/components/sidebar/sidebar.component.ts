import { Component, OnInit } from "@angular/core";
import { AuthService } from 'src/app/services/auth.service';
import { trigger,style,transition,animate,keyframes,query,stagger,group, state, animateChild } from '@angular/animations';


declare interface RouteInfo {
  path?: string;
  title: string;
  icon: string;
  class: string;
  subrutas?: RouteInfo[];
  showSubrutas?: boolean
}




export const ROUTESUSER: RouteInfo[] = [
  {
    path: "/panel",
    title: "Dashboard",
    icon: "icon-components",
    class: "",
  
  },
  {
    title: "Encuestas",
    icon: "icon-paper",
    class: "",
    showSubrutas: false,
    subrutas: [
      {
        path: "/aplicar-encuesta",
        title: "Aplicar encuesta",
        icon: "icon-bullet-list-67",
        class: "",
      }
    ]
  },
 ];


 export const ROUTESADMIN: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "icon-components",
    class: "",
    
  },
  {
    title: "Seguridad",
    icon: "icon-key-25",
    class: "",
    showSubrutas: false,
    subrutas: [
      {
        path: "/crear-usuario",
        title: "Crear usuario",
        icon: "icon-single-02",
        class: ""
      },
      {
        path: "/editar-usuario",
        title: "Editar usuario",
        icon: "icon-single-02",
        class: ""
      },
      {
        path: "/activar",
        title: "Activar",
        icon: "icon-single-02",
        class: ""
      }
    ]
  },

  {
    title: "Configuración",
    icon: "icon-settings-gear-63",
    class: "",
    showSubrutas: false,
    subrutas: [
      {
        path: "/tipo-indicador",
        title: "Tipo Indicador",
        icon: "icon-single-02",
        class: ""
      },
      {
        path: "/grupo-indicador",
        title: "Grupo Indicador",
        icon: "icon-single-02",
        class: ""
      },
      {
        path: "/variable-indicador",
        title: "Variable Indicador",
        icon: "icon-single-02",
        class: ""
      },
      {
        path: "/plan-cuentas",
        title: "plan de cuentas",
        icon: "icon-single-02",
        class: ""
      },
      {
        path: "/empresas",
        title: "Empresas",
        icon: "icon-single-02",
        class: ""
      },
      {
        path: "/Entidades",
        title: "Entidades",
        icon: "icon-single-02",
        class: ""
      },
      {
        path: "/municipios",
        title: "Municipios",
        icon: "icon-single-02",
        class: ""
      },
    ]
  },
  {
    title: "Encuesta",
    icon: "icon-paper",
    class: "",
    showSubrutas: false,
    subrutas: [
      {
        path: "/grupo-pregunta",
        title: "Grupo pregunta",
        icon: "icon-single-02",
        class: ""
      },
      {
        path: "/preguntas",
        title: "Preguntas",
        icon: "icon-single-02",
        class: ""
      },
      {
        path: "/categoria-preguntas",
        title: "Categoria preguntas",
        icon: "icon-single-02",
        class: ""
      }
    ]
  },
 
 ];

 export let ROUTES: RouteInfo[] = [];





@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('300ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  username: string;
  rol: string;

  cerrar(){
    ROUTES.forEach(e =>{
      if(e.showSubrutas){
        e.showSubrutas = false;
      }
    })
  }

  constructor(private usuario: AuthService) {}

  ngOnInit() {

    this.username = this.usuario.obtenerDatosUser().nombre.concat(' ').concat(this.usuario.obtenerDatosUser().apellido);

  
    switch (this.usuario.obtenerDatosToken(sessionStorage.getItem('token')).roles[0].nombre) {
      case 'ROLE_ADMIN':
        this.menuItems = ROUTESADMIN.filter(menuItem => menuItem);
        ROUTES = ROUTESADMIN;
        this.rol = 'admin';
        break;
      case 'ROLE_USER':
        this.menuItems = ROUTESUSER.filter(menuItem => menuItem);
         ROUTES = ROUTESUSER;
         this.rol = 'user';
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
