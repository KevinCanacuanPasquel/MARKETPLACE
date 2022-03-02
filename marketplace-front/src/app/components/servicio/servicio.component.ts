import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Servicio } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss'],
})
export class ServicioComponent implements OnInit {

  @Input() servicio: Servicio= {
    nombre: '',
    descripcion: '',
    valorEstimado: '',
    fotos: undefined,
    agrupacion: undefined,
    actividad: undefined,
    estado: ''
  };

  img1 = '/assets/perro-1.jpg';
  img2 = '/assets/perro-2.jpg';
  img3 = '/assets/perro-3.jpg';

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  mostrarAgrupacionSeleccionada(){
    this.navCtrl.navigateRoot( '/detalle-agrupacion', { state: { item: this.servicio }});
  }
}