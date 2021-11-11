import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadPage } from './actividad.page';
import { CrearActividadComponent } from './crear-actividad/crear-actividad.component';
import { GestionActividadComponent } from './gestion-actividad/gestion-actividad.component';

const routes: Routes = [
  {
    path: '',
    component: ActividadPage,
    children: [

      {
				path: '',
				redirectTo: 'gestion-actividad',
				pathMatch: 'full'
			},

      {
				path: 'gestion-actividad',
				component: GestionActividadComponent
			},
			{
				path: 'crear-actividad',
				component: CrearActividadComponent
			}
      
		]
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadPageRoutingModule {}
