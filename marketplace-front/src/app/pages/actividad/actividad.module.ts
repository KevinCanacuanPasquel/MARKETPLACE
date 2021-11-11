import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadPageRoutingModule } from './actividad-routing.module';

import { ActividadPage } from './actividad.page';
import { GestionActividadComponent } from './gestion-actividad/gestion-actividad.component';
import { CrearActividadComponent } from './crear-actividad/crear-actividad.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadPageRoutingModule,
    MatTableModule,
  
  ],
  declarations: [ActividadPage, GestionActividadComponent, CrearActividadComponent,  FooterComponent]
})
export class ActividadPageModule {}
