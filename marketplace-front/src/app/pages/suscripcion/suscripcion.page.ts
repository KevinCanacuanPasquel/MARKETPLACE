import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { BehaviorSubject } from 'rxjs';
import { DataUpload, Usuario } from 'src/app/interfaces/interfaces';
import { AgrupacionesService } from 'src/app/services/agrupaciones.service';
import { SuscripcionService } from 'src/app/services/suscripcion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.page.html',
  styleUrls: ['./suscripcion.page.scss'],
})
export class SuscripcionPage implements OnInit {

  titulo="Sucripcion"
  agrupacionValue
  duracionValue
  catalogoDuracion = [ {tiempo: "1 mes", valor: 1}, {tiempo: "6 meses", valor: 5},{tiempo: "12 meses", valor: 10}]
  catalogoAgrupaciones
  userId
  srcImg
  disableCrearButton;
  disableCrear = new BehaviorSubject<boolean>(false);

  usuario: Usuario = {};
  suscripcion ={
    fechaInicio: new Date(),
    fechaFin: new Date(),
    valor: 0,
    estado: 'ACTIVO',
    agrupacion: '',
    documento: {},
  }

  constructor(private usuarioService: UsuarioService, private agrupacionService: AgrupacionesService, private suscripcionService: SuscripcionService) {
    this.disableCrearButton   = this.disableCrear.asObservable();
    this.disableCrear.next(true);
   }

  ngOnInit() {
    this.userId = localStorage.getItem("id");
    console.log(this.userId)
    this.getAgrupaciones()
  }

  getDatosUsuario(){
    this.usuarioService.getUsuario().then(p=>{
      console.log("p", p)
     this.usuario= p;
   });
  }

  async getAgrupaciones(){
   // await  this.getDatosUsuario();
  
    this.agrupacionService.getAgrupacionesByUsuario(this.userId).subscribe((data:any)=>{
      console.log("agrupaciones" ,data.agrupaciones);
      this.catalogoAgrupaciones = data.agrupaciones
    })
  }

  cambiarDuracion(){
  
    console.log("la duracion" ,this.duracionValue)
    this.suscripcion.valor= this.duracionValue.valor
    this.suscripcion.fechaInicio = new Date();
    if(this.duracionValue.tiempo === "1 mes"){
      this.suscripcion.fechaInicio.setMonth(this.suscripcion.fechaInicio.getMonth() + 1);
      console.log(this.suscripcion.fechaInicio)

    }else if(this.duracionValue.tiempo === "6 meses") {
      this.suscripcion.fechaFin.setMonth(this.suscripcion.fechaInicio.getMonth() + 6);
      console.log(this.suscripcion.fechaFin)
    }
else if (this.duracionValue.tiempo === "12 meses"){
  this.suscripcion.fechaFin.setFullYear(this.suscripcion.fechaInicio.getFullYear() + 1);
  console.log(this.suscripcion.fechaFin)
}  }

  sumarDiasFecha(fecha, dias){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }


  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
      

    });
    console.log("la foto", capturedPhoto)
    this.srcImg= capturedPhoto.base64String
    let dataUpload:DataUpload = {
      name: "imagen",
      ext: capturedPhoto.format,
      fecha: new Date(),
      fileBase64: capturedPhoto.base64String,
               
    };
    this.suscripcion.documento = dataUpload;  
  }

  crearSuscripcion(){
    console.log( this.agrupacionValue)
    this.suscripcion.agrupacion = this.agrupacionValue._id
    this.suscripcionService.crearSuscripcion(this.suscripcion).subscribe((data:any)=>{
      if(data.ok){
        this.disableCrear.next(false);
      }
    })

    //
  }
}
