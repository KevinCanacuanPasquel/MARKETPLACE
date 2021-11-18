import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearCuentabancariaPage } from './crear-cuentabancaria.page';

const routes: Routes = [
  {
    path: '',
    component: CrearCuentabancariaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearCuentabancariaPageRoutingModule {}
