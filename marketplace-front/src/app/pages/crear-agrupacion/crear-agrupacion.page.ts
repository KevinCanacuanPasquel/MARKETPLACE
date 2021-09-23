import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgrupacionesService } from '../../services/agrupaciones.service';

@Component({
  selector: 'app-crear-agrupacion',
  templateUrl: 'crear-agrupacion.page.html',
  styleUrls: ['crear-agrupacion.page.scss']
})
export class CrearAgrupaciones {

  tempImages: string[] = [];

  agrupacion = {

    fotos: [],
    nombre: '',
    descripcion: '',
    numintegrantes: 1,
    tiempoexistente: '',
    estasuscrito: 1
    
  };
  item
  constructor( private agrupacionService: AgrupacionesService, private router: Router ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.item = this.router.getCurrentNavigation().extras.state.item;
      console.log("item", this.item)
      // this.agrupacion.fotos = this.item.fotos
      this.agrupacion.nombre = this.item.nombre
    }
  }

  crearAgrupacion() {

    console.log( this.agrupacion );
    this.agrupacionService.crearAgrupacion( this.agrupacion );

  }

}