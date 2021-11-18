import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearCuentabancariaPageRoutingModule } from './crear-cuentabancaria-routing.module';

import { CrearCuentabancariaPage } from './crear-cuentabancaria.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearCuentabancariaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CrearCuentabancariaPage]
})
export class CrearCuentabancariaPageModule {}
