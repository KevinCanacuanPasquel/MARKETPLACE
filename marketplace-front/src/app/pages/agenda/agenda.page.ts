import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  img1 = '/assets/perro-1.jpg';
  img2 = '/assets/perro-2.jpg';
  img3 = '/assets/perro-3.jpg';

  eventSource = [];

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  selectedDate = new Date();

  constructor() {
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

  confirmarAgenda() {

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

}
