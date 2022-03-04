import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GoogleMapsComponent } from 'src/app/components/google-maps/google-maps.component';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-contratos-agrupacion',
  templateUrl: './contratos-agrupacion.page.html',
  styleUrls: ['./contratos-agrupacion.page.scss'],
})
export class ContratosAgrupacionPage implements OnInit {

  eventSource = [];
  item
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  listAgenda = []
  selectedDate = new Date();
  agrupacionId 
  constructor(private router: Router, private agendaService: AgendaService, private modalCtrl: ModalController ) {
  
    if (this.router.getCurrentNavigation().extras.state) {

      let bool = false;
     
      
      
      this.item = this.router.getCurrentNavigation().extras.state.item;
      console.log("item", this.item)
      // this.agrupacion.fotos = this.item.fotos
      this.agrupacionId= this.item._id
      this.getEventos();
    
    }else{
      console.log("error cargando datos de agrupacion")
    }
    //constructor(private db: AngularFirestore,) {
    /*this.db.collection(`events`).snapshotChanges().subscribe(colSnap => {
      this.eventSource = [];
      colSnap.forEach(snap => {
        let event:any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.startTime = event.startTime.toDate();
        event.endTime = event.endTime.toDate();
        console.log(event);
        this.eventSource.push(event);
      });
    });*/
  }

  ngOnInit() {
  }

 
  addNewEvent() {
    console.log("Si entra al evento");
    let start = this.selectedDate;
    let end = this.selectedDate;
    end.setMinutes(end.getMinutes() + 60);

    let event = {
      title: 'Event #' + start.getMinutes(),
      startTime: start,
      endTime: end,
      allDay: false,
    };

    //this.db.collection(`events`).add(event);
  }

  onViewTitleChanged(title) {
    console.log(title);
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedDate = ev.selectedTime;
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }


  getEventos(){
    console.log(this.agrupacionId)
    this.agendaService.getAgendaByAgrupacion(this.agrupacionId).subscribe((data:any)=>{
      
      if(data.ok){
        this.listAgenda = data.agenda
      }
     
    })
  }

  
    async verUbicacion(item) {
      const modal = await this.modalCtrl.create({
        component: GoogleMapsComponent,
        componentProps: { 
          apiKey: 'AIzaSyAcqESvF6FdPCRxjkTRi4-13Eg7LkKhi5E',
          locationAgenda :  item.location 
         
        }
      
      });
  /*
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
    });*/
  
    return await modal.present();
  }
  
  aceptarEvento(){

  }
  rechazarEvento(){

  }
  finalizarEvento(){

  }
  validarSiYaFinalizo(fechaFin){
    if(new  Date(fechaFin)<= new Date()){
      return true 
    }
  }


}
