import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Agrupacion } from '../../interfaces/interfaces';

@Component({
  selector: 'app-agrupacion',
  templateUrl: './agrupacion.component.html',
  styleUrls: ['./agrupacion.component.scss'],
})
export class AgrupacionComponent implements OnInit {

  @Input() agrupacion: Agrupacion= {};

  img1 = '/assets/perro-1.jpg';
  img2 = '/assets/perro-2.jpg';
  img3 = '/assets/perro-3.jpg';

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  mostrarAgrupacionSeleccionada(){
    this.navCtrl.navigateRoot( '/detalle-agrupacion', { animated: true });
  }

}
