import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { OpcionesServicioInfoComponent } from '../../components/opciones-servicio-info/opciones-servicio-info.component';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';
import { UiServiceService } from 'src/app/services/ui-service.service';



@Component({
  selector: 'app-gestion-servicios',
  templateUrl: './gestion-servicios.page.html',
  styleUrls: ['./gestion-servicios.page.scss'],
})
export class GestionServiciosPage implements OnInit {

  item;
  listaServicios
  agrupacion = {
    id: '',
    fotos: [],
    nombre: '',
    descripcion: '',
    numintegrantes: 1,
    tiempoexistente: '',
    estasuscrito: 1,
    estado: ''
    
  };
  constructor( private popoverCtrl: PopoverController,
              private navCtrl: NavController , private router: Router, private servicioService: ServicioService, private uiService: UiServiceService) {

  if (this.router.getCurrentNavigation().extras.state) {

      let bool = false;
     // this.titulo = "Editar Agrupacion";
      
      
      this.item = this.router.getCurrentNavigation().extras.state.item;
      console.log("agrupacion", this.item)
      // this.agrupacion.fotos = this.item.fotos
      this.agrupacion.id = this.item._id
      this.agrupacion.nombre = this.item.nombre
      this.agrupacion.descripcion = this.item.descripcion
      this.agrupacion.numintegrantes = this.item.numintegrantes
      this.agrupacion.estado= this.item.estado
      }
               console.log("agrupacion", this.agrupacion)   
      this.getServicios();
              }

  ngOnInit() {
  }



  async opcionesServicio(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: OpcionesServicioInfoComponent,
      event: ev,
      translucent: true,
      backdropDismiss: true
    });
    await popover.present();

    //const { data } = await popover.onWillDismiss();
    //console.log(data.item);
  }

  crearServicio() {
    this.navCtrl.navigateRoot( '/crear-servicio', { animated: true, state: { agrupacion: this.agrupacion }});
  }

  getServicios(){
    this.servicioService.getAgrupacionesByUsuario(this.agrupacion.id).subscribe((data:any)=> {
      console.log("data", data)
      this.listaServicios = data.servicios
    })
  }




  editarServicio(servicio){

    console.log("que es lo que pasa aca", servicio)
    if(servicio != null){
      this.navCtrl.navigateRoot( '/crear-servicio', { state: { servicio: servicio }});
    }else{
      this.uiService.alertaActualizacionUsuario(' Debes seleccionar la agrupacion  que deseas editar ');
    }


    
  }

  eliminarServicio(servicio){
    console.log("servicio is here", servicio)
      this.servicioService.eliminarServicio(servicio._id).subscribe((data:any)=>{
        if (data){
          console.log(data)
          this.getServicios();
        }
      
      })

     
  }
  darBajaServicio(row){
    row.estado = "INACTIVO"
    this.servicioService.actualizarServicio(row).subscribe((data:any)=>{
      if(data){
        console.log("lo logro")
        this.getServicios();
      }
    
    })
  }

  activarServicio(row){
    row.estado = "ACTIVO"
    this.servicioService.actualizarServicio(row).subscribe((data:any)=>{
      if(data){
        console.log("lo logro")
        this.getServicios();
      }
    
    })
  }
}
