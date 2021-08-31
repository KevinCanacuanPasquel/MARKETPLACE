import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorarAgrupacionesPage } from './explorar_agrupaciones';

const routes: Routes = [
  {
    path: '',
    component: ExplorarAgrupacionesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorarAgrupacionesRoutingModule {}
