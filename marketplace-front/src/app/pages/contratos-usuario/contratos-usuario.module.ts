import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContratosUsuarioPageRoutingModule } from './contratos-usuario-routing.module';

import { ContratosUsuarioPage } from './contratos-usuario.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContratosUsuarioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ContratosUsuarioPage]
})
export class ContratosUsuarioPageModule {}
