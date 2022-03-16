import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Promedio, Servicio } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss'],
})
export class ServicioComponent implements OnInit {

  @Input() servicio: Servicio= {
    _id : '',
    nombre: '',
    descripcion: '',
    valorEstimado: '',
    fotos: undefined,
    agrupacion: undefined,
    actividad: undefined,
    estado: ''
  };
  @Input() promedios: Promedio[]= []

  img1 = '/assets/perro-1.jpg';
  img2 = '/assets/perro-2.jpg';
  img3 = '/assets/perro-3.jpg';
  promedio
  valorEstrellas
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    console.log("lista de promedios", this.promedios)
    this.getPromedio();
    }

  mostrarAgrupacionSeleccionada(){
    this.navCtrl.navigateRoot( '/detalle-agrupacion', { state: { item: this.servicio }});
  }

  getPromedio(){
 this.promedio= this.promedios.find(x=> String(x.servicio).trim() === String(this.servicio._id) )
 console.log("el promedio", this.promedio)
 if (!this.promedio){
   this.valorEstrellas = "Sin calificacion"
 }else{
   this.valorEstrellas = this.promedio.numEstrellas
 }
  }
}