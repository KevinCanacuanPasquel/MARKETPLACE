import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgrupacionComponent } from './agrupacion/agrupacion.component';
import { AgrupacionesComponent } from './agrupaciones/agrupaciones.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';



@NgModule({
  declarations: [
    AgrupacionComponent,
    AgrupacionesComponent,
    AvatarSelectorComponent
  ],
  exports: [
    AgrupacionesComponent,
    AvatarSelectorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
