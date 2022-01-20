import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleAgrupacionPage } from './detalle-agrupacion.page';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: DetalleAgrupacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
            ComponentsModule],
  exports: [RouterModule],
})
export class DetalleAgrupacionPageRoutingModule {}
