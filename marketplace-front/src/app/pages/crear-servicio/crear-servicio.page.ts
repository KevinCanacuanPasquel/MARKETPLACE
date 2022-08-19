import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { SubirArchivoComponent } from 'src/app/components/subir-archivo/subir-archivo.component';
import { DataUpload } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { AgrupacionesService } from '../../services/agrupaciones.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ActividadService } from 'src/app/services/actividad.service';
import { Geolocation } from '@capacitor/geolocation';
import { ServicioService } from 'src/app/services/servicio.service';

class Actividades {
    public id: string;
    public nombre: string;
    public arte: string;
    public estado: string;
}

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.page.html',
  styleUrls: ['./crear-servicio.page.scss'],
})


export class CrearServicioPage {

  titulo = "Crear Servicio";
  

  

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

  servicio = {
    id:'',
    fotos: [],
    nombre: '',
    descripcion: '',
    ubicacion:'',
    valorEstimado: 0.00,
    numvistas: 0,
    estrellas: 0,
    actividad: '',
    agrupacion:'',
    estado: "ACTIVO"
  }

  tempImages: string[] = [];
  file: File;
  filesToLoad:Array<DataUpload>=[];
  images=[];
  image:DataUpload;
  item;

  /////////observadores botones
  disableEditarButton;
  disableEditar = new BehaviorSubject<boolean>(false);
  disableCrearButton;
  disableCrear = new BehaviorSubject<boolean>(false);

//// 
catalogoArtes 

catalogoActividades: Actividades[] ;
arteValue;
actividadValue
servicioItem;
agrupacionItem;

  constructor(private actividadService: ActividadService,
              private router: Router,
              private uiService: UiServiceService ,
              public dialog: MatDialog,
              private alertCtrl: AlertController, private navCtrl: NavController,
              private servicioServicio: ServicioService) {
                this.disableEditarButton   = this.disableEditar.asObservable();
                this.disableCrearButton   = this.disableCrear.asObservable();
                this.disableCrear.next(true);
                this.disableEditar.next(false);
                console.log("item", this.router.getCurrentNavigation().extras.state)
                if (this.router.getCurrentNavigation().extras.state) {

                  let bool = false;
              
                 console.log("item", this.router.getCurrentNavigation().extras.state)
                 if( this.router.getCurrentNavigation().extras.state.agrupacion) {
                  
                  this.agrupacionItem = this.router.getCurrentNavigation().extras.state.agrupacion;
                  console.log("itemAgrupacion", this.agrupacionItem)
                  // this.agrupacion.fotos = this.item.fotos
                  this.agrupacion.id = this.agrupacionItem.id
                  this.agrupacion.nombre = this.agrupacionItem.nombre
                  this.agrupacion.descripcion = this.agrupacionItem.descripcion
                  this.agrupacion.numintegrantes = this.agrupacionItem.numintegrantes
                  this.servicio.agrupacion = this.agrupacionItem.id
                  console.log("id agrupacion" , this.agrupacion)
                 
                 }else{
                  this.titulo = "Editar Servicio";
                  this.servicioItem = this.router.getCurrentNavigation().extras.state.servicio;
                  console.log("servicioItem", this.servicioItem)
                  // this.agrupacion.fotos = this.item.fotos
                  this.servicio.id = this.servicioItem._id
                  this.arteValue = this.servicioItem.actividad.arte
                  this.actividadValue = this.servicioItem.actividad.nombre
                  this.servicio.actividad=  this.servicioItem.actividad._id
                  this.servicio.nombre = this.servicioItem.nombre
                  this.servicio.descripcion = this.servicioItem.descripcion
                  this.servicio.valorEstimado = this.servicioItem.valorEstimado
                  console.log("llego hasta aqui")
                  this.servicio.estado= this.servicioItem.estado
                  this.servicio.agrupacion = this.servicioItem.agrupacion
                  this.servicio.fotos = this.servicioItem.fotos
                  console.log("son las fotos", this.servicio.fotos)
                  console.log("servicio xd", this.servicio)
                  this.disableEditar.next(true);
                  this.disableCrear.next(false);
                 }


           
                           }
                        
               }

  ngOnInit() {
    this.getArtes("");
    this.getActividades("");
  
  }

  
  openDialog(): void {
      const dialogRef = this.dialog.open(SubirArchivoComponent, {
        width: '250px',
      
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log("el resulatdo", result)
        result.forEach(element => {
          this.servicio.fotos.push(element)
        });

        console.log("la agrupacion",  this.servicio.fotos)
      });
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
    this.servicio.fotos.push(dataUpload);  
  }

  reactivarServicio(){
    
  }

  cambiarArte($event){
    console.log($event.target.value)
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
  getArtes(arte){
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
    this.servicio.actividad  = event.value._id;
    console.log('port:', event.value._id);
  }


  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
   // this.servicio.ubicacion = coordinates
    console.log('Current', coordinates);
  }


  crearServicio(){
    console.log("servicio", this.servicio)
    if(this.servicio.fotos.length == 0){
      this.uiService.alertaActualizacionUsuario("Favor registrar mínimo una foto")
      return;
    }
    this.servicioServicio.crearServicio(this.servicio).subscribe((data:any)=>{
      console.log(data)
      if(data.ok){
        console.log("es el id que se manda", this.servicio.agrupacion)
        this.disableCrear.next(false);
        this.navCtrl.navigateRoot( '/gestion-servicios', { state: { idAgrupacion: this.servicio.agrupacion }});
        this.uiService.alertaMensajeExitoso("Se registro servicio correctamente")
      }else{
        this.uiService.alertaActualizacionUsuario(' Error al actualizar servicio ');
      }
     
    }),
    error =>{
      this.uiService.alertaActualizacionUsuario(error + " Error registrando el servicio")
    }
  }

  actualizarServicio(){
    console.log("actualizar",  this.servicio );
    this.servicioServicio.actualizarServicio( this.servicio ).subscribe((data:any)=>{
      console.log("el servicio actualizado", data)
      if(data.ok){
        this.uiService.alertaMensajeExitoso("Se ha actualizado el servicio exitosamente")
        this.navCtrl.navigateRoot( '/gestion-servicios', { state: { idAgrupacion: this.servicio.agrupacion }});
        
        this.disableEditar.next(false);
      }else{
        this.uiService.alertaActualizacionUsuario(' Error al actualizar servicio ');
      }
 
    },error =>{
      
    });

  }
}
