import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { DataUpload, Usuario } from '../../interfaces/interfaces';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;
    

  loginUser = {
    correo: 'kevin@gmail.com',
    contrasena: '1234'
  };

  srcImagen 
  registroUsuario: Usuario = {
    correo: 'diego',
    contrasena: '123456',
    repContrasena: '123456',
    nombres: 'Diego',
    apellidos: 'Serrano',
    fecha_nacimiento: '2020-01-01',
    foto: null
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
    console.log(" valido", valido)
    if( valido ) {
      //Ingresar a la APP
      this.navCtrl.navigateRoot( '/ofertar-explorar', { animated: true });
    } else {
      //Mostrar alerta de credenciales equivocadas
      this.uiService.alertaInformativa( 'Usuario y contraseña no son correctos' );
    }

    console.log( flogin.valid );
    console.log(  this.loginUser );

  }

  //Registrar usuario
  async registro ( fRegistro: NgForm ) {

    if( fRegistro.invalid || this.registroUsuario.foto==null ) {
      return;
    }

    const valido = await this.UsuarioService.registro( this.registroUsuario );

    if( valido ) {
      //Ingresar a la APP
      this.navCtrl.navigateRoot( '/ofertar-explorar', { animated: true });
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
  olvide_mi_contrasena(){

}
public async addNewToGallery() {
  // Take a photo
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Base64,
    source: CameraSource.Camera,
    quality: 100,
    

  });
  console.log("la foto", capturedPhoto)
  this.srcImagen= capturedPhoto.base64String
  let dataUpload:DataUpload = {
    name: "imagen",
    ext: capturedPhoto.format,
    fecha: new Date(),
    fileBase64: capturedPhoto.base64String,
             
  };
  this.registroUsuario.foto = dataUpload;  
}


}
