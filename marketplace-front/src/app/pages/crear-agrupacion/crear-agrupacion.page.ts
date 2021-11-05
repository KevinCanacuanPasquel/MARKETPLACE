import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { SubirArchivoComponent } from 'src/app/components/subir-archivo/subir-archivo.component';
import { DataUpload } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { AgrupacionesService } from '../../services/agrupaciones.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';


@Component({
  selector: 'app-crear-agrupacion',
  templateUrl: 'crear-agrupacion.page.html',
  styleUrls: ['crear-agrupacion.page.scss']
})
export class CrearAgrupaciones {

  tempImages: string[] = [];
  file: File;
  filesToLoad:Array<DataUpload>=[];
  images=[];
  image:DataUpload;
  titulo = "Nueva Agrupacion";
  srcJoya;
  disableEditarButton;
  disableEditar = new BehaviorSubject<boolean>(false);
  disableCrearButton;
  disableCrear = new BehaviorSubject<boolean>(false);
  agrupacion = {
    id: '',
    fotos: [],
    nombre: '',
    descripcion: '',
    numintegrantes: 1,
    tiempoexistente: '',
    estasuscrito: 1,
    estado: "ACTIVO"
    
  };
  item
  constructor( private agrupacionService: AgrupacionesService, private router: Router, private uiService: UiServiceService , public dialog: MatDialog, private alertCtrl: AlertController  ) {
 
    this.disableEditarButton   = this.disableEditar.asObservable();
    this.disableCrearButton   = this.disableCrear.asObservable();
    this.disableCrear.next(true);
    if (this.router.getCurrentNavigation().extras.state) {

      let bool = false;
      this.titulo = "Editar Agrupacion";
      
      
      this.item = this.router.getCurrentNavigation().extras.state.item;
      console.log("item", this.item)
      // this.agrupacion.fotos = this.item.fotos
      this.agrupacion.id = this.item._id
      this.agrupacion.nombre = this.item.nombre
      this.agrupacion.descripcion = this.item.descripcion
      this.agrupacion.numintegrantes = this.item.numintegrantes
      
      if(this.item.fotos.length!= 0){
      this.agrupacion.fotos = this.item.fotos

        
      }
      this.disableEditar.next(true);
      this.disableCrear.next(false);
    
    }
  }
  ngOnInit() {
    
   
 }

  crearAgrupacion() {
    if(this.filesToLoad.length !=0){
      this.agrupacion.fotos = this.filesToLoad
    }
    console.log( this.agrupacion );
    this.agrupacionService.crearAgrupacion( this.agrupacion ).subscribe((data:any)=>{
      console.log(data.ok)
      if(data.ok){
        this.router.navigate(['/gestion-agrupacion' ]);
        this.disableCrear.next(false);
      }else{
        this.uiService.alertaActualizacionUsuario(' Error al crear agrupacion ', );
      }
    
    
   

    },error =>{
      this.uiService.alertaActualizacionUsuario(' Error al crear agrupacion ');
      console.log("valio madres")
    });


  }

  actualizarAgrupacion() {

    console.log("actualizar",  this.agrupacion );
    this.agrupacionService.actualizarAgrupacion( this.agrupacion ).subscribe((data:any)=>{
      console.log(data.ok)
      if(data.ok){
        this.router.navigate(['/gestion-agrupacion' ]);
        this.disableEditar.next(false);
      }else{
        this.uiService.alertaActualizacionUsuario(' Error al actualizar agrupacion ');
      }
 
    },error =>{
      
    });

  }

    openDialog(): void {
      const dialogRef = this.dialog.open(SubirArchivoComponent, {
        width: '250px',
      
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log("eel resulatdo", result)
        result.forEach(element => {
          this.agrupacion.fotos.push(element)
        });

        console.log("la agrupacion",  this.agrupacion.fotos)
      });
    }
  
  


  
  verImagenes(){
   
    this.srcJoya = this.filesToLoad[0].fileBase64
  }



  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
      

    });
    console.log("la foto", capturedPhoto)
    this.srcJoya= capturedPhoto.base64String
    let dataUpload:DataUpload = {
      name: "imagen",
      ext: capturedPhoto.format,
      fecha: new Date(),
      fileBase64: capturedPhoto.base64String,
               
    };
    this.agrupacion.fotos.push(dataUpload);  
  }
  //ALERTAS
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'Nombre de Agrupacion requerido.',
      buttons: ['OK']
    });

    await alert.present();
  }

}