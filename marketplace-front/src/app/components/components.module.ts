import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgrupacionComponent } from './agrupacion/agrupacion.component';
import { AgrupacionesComponent } from './agrupaciones/agrupaciones.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { OpcionesMasComponent } from './opciones-mas/opciones-mas.component';
import { FooterComponent } from './footer/footer.component';

import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { SubirArchivoComponent } from './subir-archivo/subir-archivo.component';
import { GaleriaImagenesComponent } from './galeria-imagenes/galeria-imagenes.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { RegistrarEventoComponent } from './registrar-evento/registrar-evento.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ServiciosComponent } from './servicios/servicios.component';


@NgModule({
  declarations: [
    AgrupacionComponent,
    AgrupacionesComponent,
    AvatarSelectorComponent,
    OpcionesMasComponent,
    FooterComponent,
    SubirArchivoComponent,
    GaleriaImagenesComponent,
    GoogleMapsComponent,
    RegistrarEventoComponent,
    ServicioComponent,
    ServiciosComponent
    
  ],
  exports: [
    AgrupacionesComponent,
    AvatarSelectorComponent,
    OpcionesMasComponent,
    FooterComponent,
    GaleriaImagenesComponent,
    RegistrarEventoComponent,
    ServiciosComponent
   
  ],
  imports: [
    
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule,
  
 
  ]
})
export class ComponentsModule { }
