import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;
    

  loginUser = {
    correo: 'kfc0_10@hotmail.com',
    contrasena: '1234'
  };

  registroUsuario: Usuario = {
    correo: 'diego',
    contrasena: '123456',
    repContrasena: '123456',
    nombres: 'Diego',
    apellidos: 'Serrano',
    fecha_nacimiento: '2020-01-01'
  };

  constructor( private UsuarioService: UsuarioService,
               private navCtrl: NavController ,
               private uiService: UiServiceService
               ) { }

  ngOnInit() {

    
  }

  async login( flogin: NgForm) {

    if( flogin.invalid ) { return; }

    //Traer el token al iniciar correctamente la sesion
    const valido = await this.UsuarioService.login( this.loginUser.correo, this.loginUser.contrasena );

    if( valido ) {
      //Ingresar a la APP
      this.navCtrl.navigateRoot( '/main/tabs/ofertar-explorar', { animated: true });
    } else {
      //Mostrar alerta de credenciales equivocadas
      this.uiService.alertaInformativa( 'Usuario y contraseña no son correctos' );
    }

    console.log( flogin.valid );
    console.log(  this.loginUser );

  }

  //Registrar usuario
  async registro ( fRegistro: NgForm ) {

    if( fRegistro.invalid ) {
      return;
    }

    const valido = await this.UsuarioService.registro( this.registroUsuario );

    if( valido ) {
      //Ingresar a la APP
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true });
    } else {
      //Mostrar alerta de credenciales equivocadas
      this.uiService.alertaInformativa( 'Ese correo electronico ya existe' );
    }
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  bloquearSlide() {
    this.slides.lockSwipes(true);
  }


  validarPasswordsIguales(): boolean {
    if (this.registroUsuario.contrasena === this.registroUsuario.repContrasena) {
      console.log()
        return false;
    } else {
        return true;
       
    }
}



}
