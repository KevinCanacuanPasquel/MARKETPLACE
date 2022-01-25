import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaPageRoutingModule } from './agenda-routing.module';

import { AgendaPage } from './agenda.page';
import { ComponentsModule } from '../../components/components.module';

import { NgCalendarModule } from 'ionic2-calendar';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AgendaPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [AgendaPage]
})
export class AgendaPageModule {}
