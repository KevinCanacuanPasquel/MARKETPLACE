import { Component, OnInit } from '@angular/core';
import { AgrupacionesService } from '../../services/agrupaciones.service';
import { Agrupacion, Servicio } from '../../interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { PopoverController } from '@ionic/angular';
import { OpcionesMasComponent } from 'src/app/components/opciones-mas/opciones-mas.component';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-explorar_agrupaciones',
  templateUrl: 'explorar_agrupaciones.page.html',
  styleUrls: ['explorar_agrupaciones.page.scss']
})
export class ExplorarAgrupacionesPage implements OnInit {

  agrupaciones: Agrupacion[] = [];
  servicios: Servicio[]= [];

  habilitado = true;
  artevalue ='';
  actividad =''; 

  constructor( private agrupacionesService: AgrupacionesService,
    private usuarioService: UsuarioService,
                private navCtrl: NavController ,
                private serCtrl: ServicioService,
                private uiService: UiServiceService,
                private popoverCtrl: PopoverController ) {}

  ngOnInit() {

    this.siguientes();
    this.siguientesServicios();
  }

  //Metodo para cargar nuevas agrupaciones creadas
  recargar( event ) {

    this.siguientes( event, true);
    this.siguientesServicios(event, true);
    this.agrupaciones = [];
    this.habilitado = true;

  }

  //Metodo para cargar el infinite scroll
  siguientes( event?, pull:boolean = false ) {

    this.agrupacionesService.getAgrupaciones( pull )
      .subscribe( resp => {
        console.log( resp );
        this.agrupaciones.push( ...resp.agrupaciones );

        if ( event ) {
          event.target.complete();
          if ( resp.agrupaciones.length === 0 ) {
            this.habilitado = false;
          }
        }
    });

  }

  siguientesServicios( event?, pull:boolean = false ) {

    this.serCtrl.getServiciosByParams( this.artevalue, this.actividad, pull )
      .subscribe( (resp:any) => {
        console.log( resp );
        this.servicios.push( ...resp.servicios );

        if ( event ) {
          event.target.complete();
          if ( resp.servicios.length === 0 ) {
            this.habilitado = false;
          }
        }
    });

  }

  mostrarContratos(){
    this.navCtrl.navigateRoot( '/contratos-usuario', { animated: true });
  }

  


}
