import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionServiciosPage } from './gestion-servicios.page';

const routes: Routes = [
  {
    path: '',
    component: GestionServiciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionServiciosPageRoutingModule {}
