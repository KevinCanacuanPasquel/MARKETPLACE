import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentasBancariasPage } from './cuentas-bancarias.page';

const routes: Routes = [
  {
    path: '',
    component: CuentasBancariasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentasBancariasPageRoutingModule {}
