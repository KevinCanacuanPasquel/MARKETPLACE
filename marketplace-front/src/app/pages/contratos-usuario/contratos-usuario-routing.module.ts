import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContratosUsuarioPage } from './contratos-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: ContratosUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratosUsuarioPageRoutingModule {}
