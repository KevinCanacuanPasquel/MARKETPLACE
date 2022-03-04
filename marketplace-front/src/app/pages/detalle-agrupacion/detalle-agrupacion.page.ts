import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { RegistrarEventoComponent } from 'src/app/components/registrar-evento/registrar-evento.component';
import { AgrupacionesService } from 'src/app/services/agrupaciones.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalle-agrupacion',
  templateUrl: './detalle-agrupacion.page.html',
  styleUrls: ['./detalle-agrupacion.page.scss'],
})
export class DetalleAgrupacionPage implements OnInit {

  img1 = '/assets/perro-1.jpg';
  img2 = '/assets/perro-2.jpg';
  img3 = '/assets/perro-3.jpg';

  servicioId 
  item

  servicio = {
    id:'',
    fotos: [],
    nombre: '',
    descripcion: '',
    ubicacion:'',
    valorEstimado: 0.00,
    numvistas: 0,
    estrellas: 0,
    actividad: {},
    agrupacion: {
      id: '',
      fotos: [],
      nombre: '',
      descripcion: '',
      numintegrantes: 1,
      tiempoexistente: '',
      estado: "ACTIVO"
      
    },
    estado: "ACTIVO"
  }

  constructor(private agrupacionesService: AgrupacionesService,
    private usuarioService: UsuarioService,
                private navCtrl: NavController ,
                private uiService: UiServiceService,
                private popoverCtrl: PopoverController, private servicioService : ServicioService,
                private router : Router, public dialog: MatDialog) {

                  if (this.router.getCurrentNavigation().extras.state) {

                    let bool = false;
                  //  this.titulo = "Editar Agrupacion";
                    
                    
                    this.item = this.router.getCurrentNavigation().extras.state.item;
                    console.log("item", this.item)
                    this.servicioId = this.item._id
                  
                  
                  }
                 }

  ngOnInit() {
    this.getServicio()
  }

  irAgenda(){
    this.navCtrl.navigateRoot( '/agenda', { state: { servicioId: this.servicioId }});
 
  }

  getServicio(){
    console.log("el id para llamar" ,this.servicio)
    this.servicioService.getServiciosById(this.servicioId).subscribe((data:any)=>{
      console.log(data)
      if(data.ok){
        this.servicio = data.servicio;

        console.log("servicio", this.servicio)
      }
     
    })
  }

  
}
