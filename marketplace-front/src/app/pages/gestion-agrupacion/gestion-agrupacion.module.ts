import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionAgrupacionPageRoutingModule } from './gestion-agrupacion-routing.module';

import { GestionAgrupacionPage } from './gestion-agrupacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionAgrupacionPageRoutingModule
  ],
  declarations: [GestionAgrupacionPage]
})
export class GestionAgrupacionPageModule {}
