import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { AgrupacionesService } from 'src/app/services/agrupaciones.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalle-agrupacion',
  templateUrl: './detalle-agrupacion.page.html',
  styleUrls: ['./detalle-agrupacion.page.scss'],
})
export class DetalleAgrupacionPage implements OnInit {

  img1 = '/assets/perro-1.jpg';
  img2 = '/assets/perro-2.jpg';
  img3 = '/assets/perro-3.jpg';

  constructor(private agrupacionesService: AgrupacionesService,
    private usuarioService: UsuarioService,
                private navCtrl: NavController ,
                private uiService: UiServiceService,
                private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  irAgenda(){
    this.navCtrl.navigateRoot( '/agenda', { animated: true });
  }


}
