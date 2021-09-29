import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionAgrupacionPageRoutingModule } from './gestion-agrupacion-routing.module';

import { GestionAgrupacionPage } from './gestion-agrupacion.page';
import { FooterComponent } from '../../components/footer/footer.component';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionAgrupacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [GestionAgrupacionPage]
})
export class GestionAgrupacionPageModule {}
