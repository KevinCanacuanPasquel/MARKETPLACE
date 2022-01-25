import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'ofertar-explorar',
    loadChildren: () => import('./pages/ofertar-explorar/ofertar-explorar.module').then( m => m.OfertarExplorarPageModule),
    //canActivate: [ UsuarioGuard ]
    canLoad: [ UsuarioGuard ]
  },
  {
    path: 'explorar_agrupaciones',
    loadChildren: () => import('./pages/explorar_agrupaciones/explorar_agrupaciones.module').then( m => m.ExplorarAgrupacionesModule),
    //canActivate: [ UsuarioGuard ]
    canLoad: [ UsuarioGuard ]
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
 
  {
    path: 'gestion-agrupacion',
    loadChildren: () => import('./pages/gestion-agrupacion/gestion-agrupacion.module').then( m => m.GestionAgrupacionPageModule),
    canLoad: [ UsuarioGuard ]
  },

  {
    path: 'crear-agrupacion',
    loadChildren: () => import('./pages/crear-agrupacion/crear-agrupacion.module').then( m => m.CrearAgrupacionPageModule),
    canLoad: [ UsuarioGuard ]
  },
  {
    path: 'actualizar-usuario',
    loadChildren: () => import('./pages/actualizar-usuario/actualizar-usuario.module').then( m => m.ActualizarUsuarioPageModule)
  },
  {
    path: 'actividad',
    loadChildren: () => import('./pages/actividad/actividad.module').then( m => m.ActividadPageModule)
  },
  {
    path: 'gestion-servicios',
    loadChildren: () => import('./pages/gestion-servicios/gestion-servicios.module').then( m => m.GestionServiciosPageModule)
  },
  {
    path: 'crear-servicio',
    loadChildren: () => import('./pages/crear-servicio/crear-servicio.module').then( m => m.CrearServicioPageModule)
  },
  {
    path: 'cuentas-bancarias',
    loadChildren: () => import('./pages/cuentas-bancarias/cuentas-bancarias.module').then( m => m.CuentasBancariasPageModule)
  },
  {
    path: 'crear-cuentabancaria',
    loadChildren: () => import('./pages/crear-cuentabancaria/crear-cuentabancaria.module').then( m => m.CrearCuentabancariaPageModule)
  },
  {
    path: 'detalle-agrupacion',
    loadChildren: () => import('./pages/detalle-agrupacion/detalle-agrupacion.module').then( m => m.DetalleAgrupacionPageModule)
  },
  {
    path: 'suscripcion',
    loadChildren: () => import('./pages/suscripcion/suscripcion.module').then( m => m.SuscripcionPageModule)
  },  {
    path: 'agenda',
    loadChildren: () => import('./pages/agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'contratos-agrupacion',
    loadChildren: () => import('./pages/contratos-agrupacion/contratos-agrupacion.module').then( m => m.ContratosAgrupacionPageModule)
  },
  {
    path: 'contratos-usuario',
    loadChildren: () => import('./pages/contratos-usuario/contratos-usuario.module').then( m => m.ContratosUsuarioPageModule)
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
