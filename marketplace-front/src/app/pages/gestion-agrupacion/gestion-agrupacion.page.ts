import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { async, BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/interfaces/interfaces';
import { AgrupacionesService } from 'src/app/services/agrupaciones.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PopoverController } from '@ionic/angular';
import { OpcionesMasComponent } from 'src/app/components/opciones-mas/opciones-mas.component';

@Component({
  selector: 'app-gestion-agrupacion',
  templateUrl: './gestion-agrupacion.page.html',
  styleUrls: ['./gestion-agrupacion.page.scss'],
})
export class GestionAgrupacionPage implements OnInit {



  constructor(private navCtrl: NavController ,private usuarioService: UsuarioService, 
    private agrupacionService : AgrupacionesService,  private uiService: UiServiceService,
    private agrupacionesService: AgrupacionesService,
                private popoverCtrl: PopoverController) {
    
   }
  usuario: Usuario = {};
  catalogoAgrupaciones
  agrupacionValue
  
 
  ngOnInit() {
     
     
     console.log("el usuario", this.usuario)
     this.getAgrupaciones();
    
  }

  crearAgrupacion() {

   this.navCtrl.navigateRoot( '/crear-agrupacion', { animated: true });
  
 }

   getDatosUsuario(){
    this.usuarioService.getUsuario().then(p=>{
      console.log("p", p)
     this.usuario= p;
   });
  }

  async getAgrupaciones(){
    await  this.getDatosUsuario();
    console.log(this.usuario._id)
    this.agrupacionService.getAgrupacionesByUsuario(this.usuario._id).subscribe((data:any)=>{
      console.log("agrupaciones" ,data.agrupaciones);
      this.catalogoAgrupaciones = data.agrupaciones
    })
  }


  editarAgrupacion(){
    console.log(this.agrupacionValue)
    if(this.agrupacionValue != null){
      this.navCtrl.navigateRoot( '/crear-agrupacion', { state: { item: this.agrupacionValue }});
    }else{
      this.uiService.alertaActualizacionUsuario(' Debes seleccionar la agrupacion  que deseas editar ');
    }


  }

  darBajaAgrupacion() {

  }

  contratosAgrupacion() {
    if(this.agrupacionValue != null){
      this.navCtrl.navigateRoot( '/contratos-agrupacion', { state: { item: this.agrupacionValue }});
    }else{
      this.uiService.alertaActualizacionUsuario(' Debes seleccionar la agrupacion  que deseas administrar ');
    }

  }

  gestionServiciosAgrupacion() {
    if(this.agrupacionValue != null){
      this.navCtrl.navigateRoot( '/gestion-servicios', { state: { item: this.agrupacionValue }});
    }else{
      this.uiService.alertaActualizacionUsuario(' Debes seleccionar la agrupacion  que deseas administrar ');
    }
  }

  registrarServicioAgrupacion() {
    if(this.agrupacionValue != null){
      //this.navCtrl.navigateRoot( '/crear-agrupacion', { state: { item: this.agrupacionValue }});
    }else{
      this.uiService.alertaActualizacionUsuario(' Debes seleccionar una agrupacion para crear sus servicios ');
    }
  }

  
 
}


