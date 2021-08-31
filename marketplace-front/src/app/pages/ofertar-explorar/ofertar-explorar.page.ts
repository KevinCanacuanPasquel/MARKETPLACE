import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-ofertar-explorar',
  templateUrl: './ofertar-explorar.page.html',
  styleUrls: ['./ofertar-explorar.page.scss'],
})
export class OfertarExplorarPage implements OnInit {

  constructor( private UsuarioService: UsuarioService,
                private navCtrl: NavController ,
                private uiService: UiServiceService
    ) { }

  ngOnInit() {
  }
  
  ofertar(){

    this.navCtrl.navigateRoot( '/main/tabs/tab2', { animated: true });
    
  }

  explorar() {
    this.navCtrl.navigateRoot( '/main/tabs/explorar_agrupaciones', { animated: true });
  }
}
