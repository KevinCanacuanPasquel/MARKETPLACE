import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleAgrupacionPageRoutingModule } from './detalle-agrupacion-routing.module';

import { DetalleAgrupacionPage } from './detalle-agrupacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleAgrupacionPageRoutingModule
  ],
  declarations: [DetalleAgrupacionPage]
})
export class DetalleAgrupacionPageModule {}
