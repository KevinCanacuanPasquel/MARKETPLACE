import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearAgrupacionPageRoutingModule } from './crear-agrupacion-routing.module';

import { CrearAgrupaciones } from './crear-agrupacion.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { OpcionesMasComponent } from '../../components/opciones-mas/opciones-mas.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    CrearAgrupacionPageRoutingModule
  ],
  declarations: [CrearAgrupaciones]
})
export class CrearAgrupacionPageModule {}
