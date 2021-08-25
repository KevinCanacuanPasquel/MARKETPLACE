import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionAgrupacionPage } from './gestion-agrupacion.page';

const routes: Routes = [
  {
    path: 'gestion',
    component: GestionAgrupacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionAgrupacionPageRoutingModule {}
