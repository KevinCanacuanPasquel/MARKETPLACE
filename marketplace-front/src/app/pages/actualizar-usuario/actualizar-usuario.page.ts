import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DataUpload, Usuario } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { IonSlides, NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { async, BehaviorSubject, concat, merge, of } from 'rxjs';


@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.page.html',
  styleUrls: ['./actualizar-usuario.page.scss'],
})
export class ActualizarUsuarioPage implements OnInit {

  usuario: Usuario = {};
  bandera: boolean;

  disableFotoAnteriorButton;
  disableFotoAnterior = new BehaviorSubject<boolean>(false);
  
  
  constructor( private usuarioService: UsuarioService,
               private uiService: UiServiceService,
               private navCtrl: NavController ) {

                this.disableFotoAnteriorButton   = this.disableFotoAnterior.asObservable();
               }
  
  async ngOnInit() {
   await this.getDatosUsuario()
    this.getUsuarioFoto()
 
  }
  
  
  async getDatosUsuario(){
    this.usuarioService.getUsuario().then(p=>{
      console.log("p", p)
     this.usuario= p;
     return of(this.usuario);
   });

  }

   async getUsuarioFoto(){
    
    console.log(this.usuario._id)
    this.usuarioService.getUsuarioById(this.usuario._id).subscribe((data:any)=>{
      console.log("usuario" ,data.usuario);
      this.usuario.foto = data.usuario.foto;
      return of(this.usuario);
    })
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
  


  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
      
  
    });
    console.log("la foto", capturedPhoto)

    let dataUpload:DataUpload = {
      name: "imagen",
      ext: capturedPhoto.format,
      fecha: new Date(),
      fileBase64: capturedPhoto.base64String,
               
    };
    this.usuario.foto = dataUpload;  
  }
}
