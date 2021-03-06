import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { RatingModule } from 'ng-starrating';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';

//!!No utilizar la instacion del video con cordova - seguir la documentacion del link.*
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { IonicSelectableModule } from 'ionic-selectable';
import { NgCalendarModule } from 'ionic2-calendar';





@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
   
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    IonicSelectableModule,
    NgCalendarModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    RatingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
 
  providers: [ { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }] ,
  bootstrap: [AppComponent],
})
export class AppModule {}
