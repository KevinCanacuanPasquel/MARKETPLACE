import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgrupacionComponent } from './agrupacion/agrupacion.component';
import { AgrupacionesComponent } from './agrupaciones/agrupaciones.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { OpcionesMasComponent } from './opciones-mas/opciones-mas.component';



@NgModule({
  declarations: [
    AgrupacionComponent,
    AgrupacionesComponent,
    AvatarSelectorComponent,
    OpcionesMasComponent,
    
  ],
  exports: [
    AgrupacionesComponent,
    AvatarSelectorComponent,
    OpcionesMasComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    
  ]
})
export class ComponentsModule { }
