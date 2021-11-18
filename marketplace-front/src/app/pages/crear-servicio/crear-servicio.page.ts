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

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.page.html',
  styleUrls: ['./crear-servicio.page.scss'],
})
export class CrearServicioPage {

  titulo = "Crear Servicio";
  
  servicio = {
    id:'',
    fotos: [],
    nombre: '',
    descripcion: '',
    ubicacion:'',
    valor: 0.00,
    numvistas: 0,
    estrellas: 0,
  }

  tempImages: string[] = [];
  file: File;
  filesToLoad:Array<DataUpload>=[];
  images=[];
  image:DataUpload;
  srcJoya;
  item;

  disableEditarButton;
  disableEditar = new BehaviorSubject<boolean>(false);
  disableCrearButton;
  disableCrear = new BehaviorSubject<boolean>(false);

  constructor(private agrupacionService: AgrupacionesService,
              private router: Router,
              private uiService: UiServiceService ,
              public dialog: MatDialog,
              private alertCtrl: AlertController) { }

  ngOnInit() {
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
    this.servicio.fotos.push(dataUpload);  
  }

  reactivarServicio(){
    
  }

}