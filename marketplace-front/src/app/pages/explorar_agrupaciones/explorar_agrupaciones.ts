import { Component, OnInit } from '@angular/core';
import { AgrupacionesService } from '../../services/agrupaciones.service';
import { Agrupacion, Promedio, Servicio } from '../../interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { PopoverController } from '@ionic/angular';
import { OpcionesMasComponent } from 'src/app/components/opciones-mas/opciones-mas.component';
import { ServicioService } from 'src/app/services/servicio.service';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-explorar_agrupaciones',
  templateUrl: 'explorar_agrupaciones.page.html',
  styleUrls: ['explorar_agrupaciones.page.scss']
})
export class ExplorarAgrupacionesPage implements OnInit {

  agrupaciones: Agrupacion[] = [];
  servicios: Servicio[]= [];
  promedios: Promedio[]= []
  habilitado = true;
  arteValue ='';
  actividadValue =''; 
  catalogoArtes;
  catalogoActividades;

  constructor( private agrupacionesService: AgrupacionesService,
    private usuarioService: UsuarioService,
                private navCtrl: NavController ,
                private servicioService: ServicioService,
                private uiService: UiServiceService,
                private popoverCtrl: PopoverController,
                private actividadService: ActividadService,
                private calificacionService: CalificacionService ) {}

  ngOnInit() {
    this.getPromedios();
   // this.siguientes();
    this.siguientesServicios();
    this.getArtes();
    this.getActividades(null);

  }

  //Metodo para cargar nuevas agrupaciones creadas
  recargar( event ) {

   // this.siguientes( event, true);
    this.siguientesServicios(event, true);
    this.agrupaciones = [];
    this.habilitado = true;

  }

  //Metodo para cargar el infinite scroll
 /* siguientes( event?, pull:boolean = false ) {

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

  }*/

  siguientesServicios( event?, pull:boolean = false ) {

    this.servicioService.getServiciosByParams( this.arteValue, this.actividadValue, pull )
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

  getPromedios(){
    this.calificacionService.getPromedios().subscribe((data:any)=>{
      this.promedios =data.promedio 
    })
  }

  cambiarArte($event){
    console.log($event.target.value)
    this.arteValue= $event.target.value
    this.getActividades($event.target.value);
  }

  getActividades(arte){
    this.actividadService.getActividadesByParams("",  arte, "ACTIVO").subscribe((data:any)=> {
      if(data){
        console.log("xd", data)
   
        this.catalogoActividades = data.actividades;
        console.log("actividades",this.catalogoActividades)
      }
    })
  }
  getArtes(){
    this.actividadService.getArtes().subscribe((data:any)=> {
      if(data){
        console.log("artes", data)
   
        this.catalogoArtes = data.artesunique;
        console.log("artes",this.catalogoArtes)
      }
    })
  }

  actividadChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.actividadValue  = event.value._id;
    console.log('port:', event.value._id);
  }

  buscar(){
    this.siguientesServicios();
  }
}
