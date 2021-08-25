import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    //canActivate: [ UsuarioGuard ]
    canLoad: [ UsuarioGuard ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'ofertar-explorar',
    loadChildren: () => import('./pages/ofertar-explorar/ofertar-explorar.module').then( m => m.OfertarExplorarPageModule)
  },
  {
    path: 'gestion-agrupacion',
    loadChildren: () => import('./gestion-agrupacion/gestion-agrupacion.module').then( m => m.GestionAgrupacionPageModule)
  },
  {
    path: 'gestion-agrupacion',
    loadChildren: () => import('./pages/gestion-agrupacion/gestion-agrupacion.module').then( m => m.GestionAgrupacionPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
