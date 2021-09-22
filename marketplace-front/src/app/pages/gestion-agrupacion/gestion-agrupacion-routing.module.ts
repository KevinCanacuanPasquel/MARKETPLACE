import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionAgrupacionPage } from './gestion-agrupacion.page';

const routes: Routes = [
  {
    //path: '/gestion-agrupacion',
    path: '',
    component: GestionAgrupacionPage,
    /*children: [
      {
        path: 'crear-agrupacion',
        loadChildren: () => import('../crear-agrupacion/crear-agrupacion.module').then(m => m.CrearAgrupacionPageModule)
      },
      {
        path: '',
        redirectTo: '/ofertar-explorar',
        pathMatch: 'full'
      }
    ]
  */},
  /*{
    path: '',
    redirectTo: '/ofertar-explorar',
    pathMatch: 'full'
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionAgrupacionPageRoutingModule {}

