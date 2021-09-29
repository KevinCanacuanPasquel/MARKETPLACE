import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
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
     this.usuario = this.usuarioService.getUsuario();
     
     console.log(this.usuario)
     this.getAgrupaciones();
    
  }

  crearAgrupacion() {

   this.navCtrl.navigateRoot( '/crear-agrupacion', { animated: true });
  
 }

 
  getAgrupaciones(){
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

  
 
}


