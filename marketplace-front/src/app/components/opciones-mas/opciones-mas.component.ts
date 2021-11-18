import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-opciones-mas',
  templateUrl: './opciones-mas.component.html',
  styleUrls: ['./opciones-mas.component.scss'],
})
export class OpcionesMasComponent implements OnInit {

  constructor(private popoverCtrl: PopoverController,
              private navCtrl: NavController,
              private usuarioService: UsuarioService,) { }

  ngOnInit(   ) {}

  pagoSuscripcion() {

    this.navCtrl.navigateRoot( '/', { animated: true });
    
  }

  actualizarUsuario() {
    this.popoverCtrl.dismiss();
    this.navCtrl.navigateRoot( '/actualizar-usuario', { animated: true });
  }
  
  onClick(valor: number ) {

    this.popoverCtrl.dismiss({
      item: valor
    });
    
  }

  cuentasBancarias() {
    this.popoverCtrl.dismiss();
    this.navCtrl.navigateRoot( '/cuentas-bancarias', { animated: true });
  }

  logout() {

    this.popoverCtrl.dismiss();
    this.usuarioService.logout();

  }

}
