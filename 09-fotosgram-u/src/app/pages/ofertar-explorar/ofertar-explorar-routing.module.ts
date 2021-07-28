import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfertarExplorarPage } from './ofertar-explorar.page';

const routes: Routes = [
  {
    path: '',
    component: OfertarExplorarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfertarExplorarPageRoutingModule {}
