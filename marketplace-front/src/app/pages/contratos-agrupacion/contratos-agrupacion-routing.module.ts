import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContratosAgrupacionPage } from './contratos-agrupacion.page';

const routes: Routes = [
  {
    path: '',
    component: ContratosAgrupacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratosAgrupacionPageRoutingModule {}
