import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgrupacionComponent } from './agrupacion/agrupacion.component';
import { AgrupacionesComponent } from './agrupaciones/agrupaciones.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { OpcionesMasComponent } from './opciones-mas/opciones-mas.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AgrupacionComponent,
    AgrupacionesComponent,
    AvatarSelectorComponent,
    OpcionesMasComponent,
    FooterComponent
    
  ],
  exports: [
    AgrupacionesComponent,
    AvatarSelectorComponent,
    OpcionesMasComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    
  ]
})
export class ComponentsModule { }
