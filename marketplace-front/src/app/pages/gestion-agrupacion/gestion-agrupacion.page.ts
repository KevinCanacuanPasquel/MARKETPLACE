import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-gestion-agrupacion',
  templateUrl: './gestion-agrupacion.page.html',
  styleUrls: ['./gestion-agrupacion.page.scss'],
})
export class GestionAgrupacionPage implements OnInit {
  

  constructor(private navCtrl: NavController ,) { }

  ngOnInit() {
  }

  crearAgrupacion() {

   this.navCtrl.navigateRoot( '/crear-agrupacion', { animated: true });
  
 }

}


