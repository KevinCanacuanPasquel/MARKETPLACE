import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { RegistrarEventoComponent } from 'src/app/components/registrar-evento/registrar-evento.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  img1 = '/assets/perro-1.jpg';
  img2 = '/assets/perro-2.jpg';
  img3 = '/assets/perro-3.jpg';


  ngOnInit() {
  }
  selectedDay = new Date()
  selectedObject
  eventSource = []
  viewTitle;
  isToday: boolean;
    
  calendarModes = [
    { key: 'month', value: 'Month' },
    { key: 'week', value: 'Week' },
    { key: 'day', value: 'Day' },
  ]
  calendar = {
    mode: (this.calendarModes[0].key),
    currentDate: new Date()
  }; // these are the variable used by the calendar.
  constructor(public navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController, public dialog: MatDialog) {

    // this.markDisabled(new Date(2017, 12, 25))
  }

  loadEvents() {
    //this.eventSource = this.createRandomEvents();
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }
  changeMode(mode) {
    this.calendar.mode = mode;
  }
  today() {
    this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedObject = ev
    // this.openActionSheet(ev)
  }
  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();

    this.selectedDay = event

  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return (date < current);
  };
/*
  openActionSheet(event) {
    console.log('opening');
    let actionsheet = this.actionSheetCtrl.create({
      title: "Choose Option",
      buttons: [
        {
          text: 'Block Date',
          handler: () => {
            console.log("Block Date Clicked: ", event);
            let d = event.selectedTime;
            //d.setHours(0, 0, 0);
            setTimeout(() => {
              this.blockDayEvent(d)
            }, 2);
          }
        },
        {
          text: 'Meet Up With',
          handler: function () {
            console.log("Meet Up With Clicked");
          }
        }
      ]
    }); actionsheet.present();
  }
*/
  blockDayEvent(date) {
    let startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

    let endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

    let events = this.eventSource;
    events.push({
      title: 'All Day ',
      startTime: startTime,
      endTime: endTime,
      allDay: true
    });
    this.eventSource = [];
    setTimeout(() => {
      this.eventSource = events;
    });
  }

 /* addEvent() {
    let modal = this.modalCtrl.create(EventModalPage, { selectedDay: this.selectedDay });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }*/

  addEvent(): void {
    const dialogRef = this.dialog.open(RegistrarEventoComponent, {
      width: 'auto',
      height: 'auto'
    
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("eel resulatdo", result)
      

     
    });
  }

  onOptionSelected($event: any) {
    console.log($event)
    //this.calendar.mode = $event
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: RegistrarEventoComponent,
    /*  componentProps: {
        'nombre': 'Aitor',
        'apellidos': 'Sánchez',
        'locale': 'es_ES'
      }*/
    });
    return await modal.present();
  }


  
}