import { compileNgModule } from '@angular/compiler';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';


import { ModalController, NavController, NavParams } from '@ionic/angular';
import { AgendaService } from 'src/app/services/agenda.service';


import { DataService } from 'src/app/services/data.service';
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
  
  fecha
  servicio
  message
  cliente
  agenda = {
    nombre: '',
    horaInicio : '',
    horaFin: '',
    fechaAgenda: '',
    location: {
        lat : '',
        lng : '',
    },
    estado: '',
    cliente: '',
    servicio:'', 
    fechaCreacion: '',
    descripcion: ''


  }
  minDate = new Date().toISOString();
 

  constructor(
    public navCtrl: NavController, private modalCtrl:  ModalController,
    private dataService : DataService,
    private agendaService: AgendaService,

   
   ) {
 //   let preselectedDate = moment(this.navParams.get('selectedDay')).format();
 //   this.event.startTime = preselectedDate;
 //   this.event.endTime = preselectedDate;0
  }

  ngOnInit() {
  
    console.log( "fthis fecha", this.fecha)
    console.log("servicio", this.servicio)
    console.log(" cliente", this.cliente)
   
    this.agenda.fechaCreacion = new Date().toISOString();
    this.agenda.cliente = this.cliente
    this.agenda.servicio = this.servicio
  }

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

    modal.onDidDismiss()
    .then((data) => {
     console.log( data)
      this.dataService.currentMessage.subscribe(
      message => {
        this.message = message
        this.agenda.location = this.message
          }
  
     
    )
    
  
      // Here's your selected user!
  });

  return await modal.present();
}
  
/*
openDialog(): void {
  const dialogRef = this.dialog.open(GoogleMapsComponent, {
    width: '800px',
    height: '800px'
  
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log("eel resulatdo", result)
  

    
  });
}
*/

registrarEvento(){
  console.log(this.agenda)
 var  fechaAgendaOnlyDate = this.fecha.toISOString().split("T")[0]
  var tiempitoInicio = this.agenda.horaInicio.split("T")[1]
  var tiempitoFin = this.agenda.horaFin.split("T")[1]
 this.agenda.horaInicio =  new Date(fechaAgendaOnlyDate.concat("T").concat(tiempitoInicio)).toISOString()
 this.agenda.horaFin =  new Date(fechaAgendaOnlyDate.concat("T").concat(tiempitoFin)).toISOString()


  this.agendaService.crearAgenda(this.agenda).subscribe((data:any)=>{
    if(data.ok){
      
        this.modalCtrl.dismiss(data.agenda);
      
    }
  })
}


 CombineDateAndTime(date, time) {
  var timeString = time.getHours() + ':' + time.getMinutes() + ':00';
  var ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  var year = date.getFullYear();
  var month = date.getMonth() + 1; // Jan is 0, dec is 11
  var day = date.getDate();
  var dateString = '' + year + '-' + month + '-' + day;
  var datec = dateString + 'T' + timeString;
  var combined = new Date(datec);

  return combined;
};
}
