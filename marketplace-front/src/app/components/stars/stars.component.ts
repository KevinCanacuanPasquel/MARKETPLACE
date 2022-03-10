import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent implements OnInit {

  constructor( private modalCtr: ModalController) { }

  ngOnInit() {}
  
  wrapperCalificacion = {
    comentario: '',
    valor: 0
  }
  
  valorEstrella = 5;
  valorMaxEstrella = 5
  banderita = false; 

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    console.log($event.oldValue,
       $event.newValue);

       this.wrapperCalificacion.valor = $event.newValue

  }

 
  //emite afuera los datos
  guardarCalificacion(){
    this.modalCtr.dismiss(this.wrapperCalificacion);
  }
}
