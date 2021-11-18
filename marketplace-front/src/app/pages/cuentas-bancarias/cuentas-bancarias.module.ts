import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentasBancariasPageRoutingModule } from './cuentas-bancarias-routing.module';

import { CuentasBancariasPage } from './cuentas-bancarias.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentasBancariasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CuentasBancariasPage]
})
export class CuentasBancariasPageModule {}
