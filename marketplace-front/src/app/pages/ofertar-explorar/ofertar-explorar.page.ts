import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { PopoverController } from '@ionic/angular';
import { OpcionesMasComponent } from '../../components/opciones-mas/opciones-mas.component';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-ofertar-explorar',
  templateUrl: './ofertar-explorar.page.html',
  styleUrls: ['./ofertar-explorar.page.scss'],
})
export class OfertarExplorarPage implements OnInit {


  constructor( private usuarioService: UsuarioService,
                private navCtrl: NavController ,
                private uiService: UiServiceService,
                private popoverCtrl: PopoverController
    ) { }

  ngOnInit() {
  
  }
  
  ofertar(){

    this.navCtrl.navigateRoot( '/gestion-agrupacion', { animated: true });
    
  }

  explorar() {
    this.navCtrl.navigateRoot( '/explorar_agrupaciones', { animated: true });
  }

  logout() {

    this.usuarioService.logout();

  }
  async mas(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: OpcionesMasComponent,
      event: ev,
      translucent: true,
      backdropDismiss: false
    });
    await popover.present();

  }
}
