import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};

  constructor( private usuarioService: UsuarioService,
               private uiService: UiServiceService ) {}
  
  ngOnInit() {

    this.usuario = this.usuarioService.getUsuario();

    console.log(this.usuario);
    
  }

  async actualizar( fActualizar: NgForm ) {
    if( fActualizar.invalid ) { return; }

    const actualizado = await this.usuarioService.actualizarUsuario( this.usuario);

    if ( actualizado ) {
      //Toast de mensaje actualizado
      this.uiService.alertaActualizacionUsuario(' Usuario actualizado ');
    } else {
      //Toast con error
      this.uiService.alertaActualizacionUsuario(' No se pudo actualizar ');
    }
  }

  logout() {

    this.usuarioService.logout();

  }

}
