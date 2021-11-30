import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';

import { CrearServicioPageRoutingModule } from './crear-servicio-routing.module';

import { CrearServicioPage } from './crear-servicio.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearServicioPageRoutingModule,
    ComponentsModule,
    IonicSelectableModule
  ],
  declarations: [CrearServicioPage]
})
export class CrearServicioPageModule {}
