import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearAgrupaciones } from './crear-agrupacion.page';

const routes: Routes = [
  {
    path: '',
    component: CrearAgrupaciones
  },
  {
    path: '/:idAgrupacion',
    component: CrearAgrupaciones
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearAgrupacionPageRoutingModule {}
