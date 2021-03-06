import { Routes } from "@angular/router";
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'indicadores-tipo', loadChildren: '../../pages/indicadores-tipo/indicadores-tipo.module#IndicadoresTipoModule' },
  { path: 'indicadores-grupo', loadChildren: '../../pages/indicadores-grupo/indicadores-grupo.module#IndicadoresGrupoModule' },
  { path: 'indicadores-variables', loadChildren: '../../pages/indicadores-variables/indicadores-variables.module#IndicadoresVariablesModule' },
  { path: 'plan-cuenta', loadChildren: '../../pages/plan-cuenta/plan-cuenta.module#PlanCuentaModule' },
  { path: 'categorias', loadChildren: '../../pages/categorias/categorias.module#CategoriasModule' },
  { path: 'entidades', loadChildren: '../../pages/entidades/entidades.module#EntidadesModule' },
  { path: 'usuarios', loadChildren: '../../pages/usuarios/usuarios.module#UsuariosModule' },
  { path: 'preguntas', loadChildren: '../../pages/preguntas/preguntas.module#PreguntasModule' },
  { path: 'grupo-preguntas', loadChildren: '../../pages/grupo-preguntas/grupo-preguntas.module#GrupoPreguntasModule' },
  { path: 'categorias-preguntas', loadChildren: '../../pages/categorias-preguntas/categorias-preguntas.module#CategoriasPreguntasModule' },
  { path: 'encuesta', loadChildren: '../../pages/encuesta/encuesta.module#EncuestaModule' },
  { path: 'calendario', loadChildren: '../../pages/calendario/calendario.module#CalendarioModule' },
  { path: 'reportes', loadChildren: '../../pages/reportes/reportes.module#ReportesModule' }
];
