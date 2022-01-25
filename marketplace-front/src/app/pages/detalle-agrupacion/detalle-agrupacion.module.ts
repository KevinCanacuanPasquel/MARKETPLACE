import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleAgrupacionPageRoutingModule } from './detalle-agrupacion-routing.module';

import { DetalleAgrupacionPage } from './detalle-agrupacion.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DetalleAgrupacionPageRoutingModule
  ],
  declarations: [DetalleAgrupacionPage]
})
export class DetalleAgrupacionPageModule {}
