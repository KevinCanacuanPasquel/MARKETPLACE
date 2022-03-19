import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministradorPageRoutingModule } from './administrador-routing.module';

import { AdministradorPage } from './administrador.page';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { GestionServiciosComponent } from './gestion-servicios/gestion-servicios.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorPageRoutingModule
  ],
  declarations: [AdministradorPage, GestionUsuariosComponent, GestionServiciosComponent]
})
export class AdministradorPageModule {}
