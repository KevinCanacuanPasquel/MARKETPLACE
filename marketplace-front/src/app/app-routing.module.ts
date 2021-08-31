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
    path: 'main',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
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
