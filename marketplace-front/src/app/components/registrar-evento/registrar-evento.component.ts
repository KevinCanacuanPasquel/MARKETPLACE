import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { ModalController, NavController, NavParams } from '@ionic/angular';

import { of } from 'rxjs';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';

@Component({
  selector: 'app-registrar-evento',
  templateUrl: './registrar-evento.component.html',
  styleUrls: ['./registrar-evento.component.scss'],
})
export class RegistrarEventoComponent implements OnInit {
  @ViewChild(GoogleMapsComponent) mapComponent: GoogleMapsComponent;
  event = {
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false,
    notes:'',
    room : {},
    title: ''
  };
  minDate = new Date().toISOString();
  rooms$ = of([{ id: "room1", name: "room1" }, { id: "room2", name: "room2" }, { id: "room3", name: "room3" }])

  constructor(
    public navCtrl: NavController, private modalCtrl:  ModalController
   
   ) {
 //   let preselectedDate = moment(this.navParams.get('selectedDay')).format();
 //   this.event.startTime = preselectedDate;
 //   this.event.endTime = preselectedDate;0
  }

  ngOnInit() {}

  cancel() {
  //  this.viewCtrl.dismiss();
  }

  save() {
  //  this.viewCtrl.dismiss(this.event);
  }

  blockDay($event) {
    console.log($event)
  }

  optionSelected($event) {
    console.log($event)
    this.event.room = $event
  }


  
  testMarker() {
    let center = this.mapComponent.map.getCenter();
    this.mapComponent.addMarker(center.lat(), center.lng());
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: GoogleMapsComponent,
      componentProps: { 
        apiKey: 'AIzaSyAcqESvF6FdPCRxjkTRi4-13Eg7LkKhi5E',
       
      }
    /*  componentProps: {
        'nombre': 'Aitor',
        'apellidos': 'Sánchez',
        'locale': 'es_ES'
      }*/
    });
    return await modal.present();
  }

}
