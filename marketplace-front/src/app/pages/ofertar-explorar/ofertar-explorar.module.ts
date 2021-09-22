import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfertarExplorarPageRoutingModule } from './ofertar-explorar-routing.module';

import { OfertarExplorarPage } from './ofertar-explorar.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    OfertarExplorarPageRoutingModule
  ],
  declarations: [OfertarExplorarPage]
})
export class OfertarExplorarPageModule {}
