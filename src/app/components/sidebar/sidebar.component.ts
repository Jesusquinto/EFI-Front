import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, style, transition, animate, keyframes, query, stagger, group, state, animateChild } from '@angular/animations';


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
    path: '/panel',
    title: 'Inicio',
    icon: 'icon-components',
    class: '',

  },
  {
    title: 'Encuestas',
    icon: 'icon-paper',
    class: '',
    showSubrutas: false,
    subrutas: [
      {
        path: "/aplicar-encuesta",
        title: "Aplicar encuesta",
        icon: "icon-single-copy-04",
        class: "",
      },
      {
        path: "/encuestas-realizadas",
        title: "Encuestas realizadas",
        icon: "icon-bullet-list-67",
        class: "",
      }
    ]
  },

  {
    path: "/user-indicadores",
    title: "Indicadores",
    icon: "icon-chart-bar-32",
    class: "",
  
  },

  {
    path: "/user-alertas",
    title: "Alertas",
    icon: "icon-bell-55",
    class: "",
  
  },

  {
    path: "/calidad",
    title: "Calidad FUT",
    icon: "icon-sound-wave",
    class: "",
  
  },
  {
    path: '/tendencias',
    title: 'Tendencias',
    icon: 'icon-chart-pie-36',
    class: '',

  },
 ];


export const ROUTESADMIN: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Inicio',
    icon: 'icon-components',
    class: '',

  },
  {
    title: 'Seguridad',
    icon: 'icon-key-25',
    class: '',
    showSubrutas: false,
    subrutas: [
      {
        path: '/usuarios',
        title: 'Usuarios',
        icon: 'icon-single-02',
        class: ''
      }
    ]
  },

  {
    title: 'Configuración',
    icon: 'icon-settings-gear-63',
    class: '',
    showSubrutas: false,
    subrutas: [
      {
        path: '/calendario',
        title: 'Calendario',
        icon: 'icon-single-02',
        class: ''
      },
      {
        path: '/categorias',
        title: 'Categorias',
        icon: 'icon-single-02',
        class: ''
      },
      {
        path: '/indicadores-tipo',
        title: 'Tipo Indicador',
        icon: 'icon-single-02',
        class: ''
      },
      {
        path: '/indicadores-grupo',
        title: 'Grupo Indicador',
        icon: 'icon-single-02',
        class: ''
      },
      {
        path: '/indicadores-variables',
        title: 'Variable Indicador',
        icon: 'icon-single-02',
        class: ''
      },
      {
        path: '/plan-cuenta',
        title: 'plan de cuentas',
        icon: 'icon-single-02',
        class: ''
      },
      {
        path: '/empresa',
        title: 'Empresas',
        icon: 'icon-single-02',
        class: ''
      },
      {
        path: '/entidades',
        title: 'Entidades',
        icon: 'icon-single-02',
        class: ''
      },
      {
        path: '/reportes',
        title: 'Reportes',
        icon: 'icon-single-02',
        class: ''
      },
    ]
  },
  {
    title: 'Encuesta',
    icon: 'icon-paper',
    class: '',
    showSubrutas: false,
    subrutas: [
      {
        path: '/encuesta',
        title: 'Encuestas',
        icon: 'icon-single-02',
        class: ''
      },
      {
        path: '/grupo-preguntas',
        title: 'Grupo pregunta',
        icon: 'icon-single-02',
        class: ''
      },
      {
        path: '/preguntas',
        title: 'Preguntas',
        icon: 'icon-single-02',
        class: ''
      },
      {
        path: '/categorias-preguntas',
        title: 'Categoria preguntas',
        icon: 'icon-single-02',
        class: ''
      }
    ]
  },

];

export let ROUTES: RouteInfo[] = [];





@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('300ms', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ]
    )
  ],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  username: string;
  rol: string;

  cerrar() {
    ROUTES.forEach(e => {
      if (e.showSubrutas) {
        e.showSubrutas = false;
      }
    })
  }

  constructor(private usuario: AuthService) { }

  ngOnInit() {

    this.isMobileMenu();

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
