import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadPageRoutingModule } from './actividad-routing.module';

import { ActividadPage } from './actividad.page';
import { GestionActividadComponent } from './gestion-actividad/gestion-actividad.component';
import { CrearActividadComponent } from './crear-actividad/crear-actividad.component';

import { MatTableModule } from '@angular/material/table';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadPageRoutingModule,
    MatTableModule,
    ComponentsModule
  
  ],
  declarations: [ActividadPage, GestionActividadComponent, CrearActividadComponent]
})
export class ActividadPageModule {}
