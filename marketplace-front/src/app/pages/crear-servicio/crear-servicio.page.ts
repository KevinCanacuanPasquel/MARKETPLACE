import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    valor: 0.00,
    numvistas: 0,
    estrellas: 0,
    actividad: '',
    agrupacion:'',
    estado:''
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
catalogoArtes =["escenica", "musica", "plastica"]
catalogoActividades: Actividades[] ;
arteValue;
actividadValue


  constructor(private actividadService: ActividadService,
              private router: Router,
              private uiService: UiServiceService ,
              public dialog: MatDialog,
              private alertCtrl: AlertController,
              private servicioServicio: ServicioService) {


                if (this.router.getCurrentNavigation().extras.state) {

                  let bool = false;
                 // this.titulo = "Editar Agrupacion";
                  
                  
                  this.item = this.router.getCurrentNavigation().extras.state.item;
                  console.log("item", this.item)
                  // this.agrupacion.fotos = this.item.fotos
                  this.servicio.id = this.item.id
                  this.arteValue = this.item.actividad.arte
                  this.actividadValue = this.item.actividad.nombre
                  this.servicio.actividad=  this.item.actividad.nombre
                  this.servicio.nombre = this.item.nombre
                  this.servicio.descripcion = this.item.descripcion
                  this.servicio.valor = this.item.valor
                  this.servicio.estado= this.item.estado
                 console.log("id agrupacion" , this.agrupacion)
                           }
                        
               }

  ngOnInit() {
    this.getActividades("");
  }

  
  openDialog(): void {
      const dialogRef = this.dialog.open(SubirArchivoComponent, {
        width: '250px',
      
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log("eel resulatdo", result)
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
    this.servicioServicio.crearServicio(this.servicio).subscribe((data:any)=>{
      console.log(data)
    })
  }
}
