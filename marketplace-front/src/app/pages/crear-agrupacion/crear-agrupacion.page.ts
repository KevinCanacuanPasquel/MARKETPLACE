import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AgrupacionesService } from '../../services/agrupaciones.service';

@Component({
  selector: 'app-crear-agrupacion',
  templateUrl: 'crear-agrupacion.page.html',
  styleUrls: ['crear-agrupacion.page.scss']
})
export class CrearAgrupaciones {

  tempImages: string[] = [];

  titulo = "Nueva Agrupacion";
  
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
    estasuscrito: 1
    
  };
  item
  constructor( private agrupacionService: AgrupacionesService,
               private router: Router,
               private alertCtrl: AlertController ) {
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
      this.disableEditar.next(true);
      this.disableCrear.next(false);
    
    }
  }
  ngOnInit() {
    
   
 }

  crearAgrupacion() {

    console.log( this.agrupacion );
    this.agrupacionService.crearAgrupacion( this.agrupacion ).subscribe((data:any)=>{
      console.log(data.ok)
      if(data.ok){
        this.router.navigate(['/gestion-agrupacion' ]);
        this.disableCrear.next(false);
      }
    
   

    },error =>{
      
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
      }

    },error =>{
      
      console.log("valio madres")
    });

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