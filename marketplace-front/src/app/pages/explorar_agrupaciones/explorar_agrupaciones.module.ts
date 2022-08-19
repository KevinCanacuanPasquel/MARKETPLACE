import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExplorarAgrupacionesPage } from './explorar_agrupaciones';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ExplorarAgrupacionesRoutingModule } from './explorar_agrupaciones-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ExplorarAgrupacionesRoutingModule,
    ComponentsModule,
    IonicSelectableModule
  ],
  declarations: [ExplorarAgrupacionesPage]
})
export class ExplorarAgrupacionesModule {}
