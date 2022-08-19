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

  usuario: Usuario
  constructor( private usuarioService: UsuarioService,
                private navCtrl: NavController ,
                private uiService: UiServiceService,
                private popoverCtrl: PopoverController
    ) { }

  ngOnInit() {
    this.getDatosUsuario();
  }
  
  ofertar(){

    this.navCtrl.navigateRoot( '/gestion-agrupacion', { animated: true });
    
  }

  explorar() {
    this.navCtrl.navigateRoot( '/explorar_agrupaciones', { animated: true });
  }

  
  getDatosUsuario(){
 
    if( localStorage.getItem("id")== undefined ){

      this.usuarioService.getUsuario().then(p=>{
        console.log("p", p)
       this.usuario= p;
       localStorage.setItem("id", this.usuario._id);
       console.log(localStorage.getItem("id"))
     });
    }
 
  }
}
