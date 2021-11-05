import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { IonSlides, NavController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.page.html',
  styleUrls: ['./actualizar-usuario.page.scss'],
})
export class ActualizarUsuarioPage implements OnInit {

  usuario: Usuario = {};

  constructor( private usuarioService: UsuarioService,
               private uiService: UiServiceService,
               private navCtrl: NavController ) {}
  
  ngOnInit() {

    this.usuarioService.getUsuario().then(p=>{
      this.usuario= p;
    });

    console.log(this.usuario);
    
  }

  async actualizar( fActualizar: NgForm ) {
    if( fActualizar.invalid ) { return; }

    const actualizado = await this.usuarioService.actualizarUsuario( this.usuario);

    if ( actualizado ) {
      //Toast de mensaje actualizado
      this.uiService.alertaActualizacionUsuario(' Usuario actualizado ');
      this.navCtrl.navigateRoot( '/explorar_agrupaciones', { animated: true });
    } else {
      //Toast con error
      this.uiService.alertaActualizacionUsuario(' No se pudo actualizar ');
    }
  }

}
