import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionServiciosPageRoutingModule } from './gestion-servicios-routing.module';

import { GestionServiciosPage } from './gestion-servicios.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionServiciosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [GestionServiciosPage]
})
export class GestionServiciosPageModule {}
