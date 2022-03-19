import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorPage } from './administrador.page';
import { GestionServiciosComponent } from './gestion-servicios/gestion-servicios.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';



const routes: Routes = [
  {
    path: '',
    component: AdministradorPage,
    children: [

      {
				path: '',
				redirectTo: 'gestion-usuario',
				pathMatch: 'full'
			},

      {
				path: 'gestion-usuario',
				component: GestionUsuariosComponent
			},
			{
				path: 'gestion-servicios',
				component: GestionServiciosComponent
			}
      
		]
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorPageRoutingModule {}
