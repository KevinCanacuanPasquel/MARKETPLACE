import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContratosAgrupacionPageRoutingModule } from './contratos-agrupacion-routing.module';

import { ContratosAgrupacionPage } from './contratos-agrupacion.page';

import { NgCalendarModule } from 'ionic2-calendar';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContratosAgrupacionPageRoutingModule,
    ComponentsModule,
    NgCalendarModule
  ],
  declarations: [ContratosAgrupacionPage]
})
export class ContratosAgrupacionPageModule {}
