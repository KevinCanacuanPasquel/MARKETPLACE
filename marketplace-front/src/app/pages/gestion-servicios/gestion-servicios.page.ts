import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { OpcionesServicioInfoComponent } from '../../components/opciones-servicio-info/opciones-servicio-info.component';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-gestion-servicios',
  templateUrl: './gestion-servicios.page.html',
  styleUrls: ['./gestion-servicios.page.scss'],
})
export class GestionServiciosPage implements OnInit {

  constructor( private popoverCtrl: PopoverController,
              private navCtrl: NavController ) { }

  ngOnInit() {
  }

  agrupacionValue

  async opcionesServicio(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: OpcionesServicioInfoComponent,
      event: ev,
      translucent: true,
      backdropDismiss: true
    });
    await popover.present();

    //const { data } = await popover.onWillDismiss();
    //console.log(data.item);
  }

  crearServicio() {
    this.navCtrl.navigateRoot( '/crear-servicio', { animated: true, state: { item: this.agrupacionValue }});
  }

}
