import { Component } from '@angular/core';
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

  constructor( private agrupacionService: AgrupacionesService ) {}

  crearAgrupacion() {

    console.log( this.agrupacion );
    this.agrupacionService.crearAgrupacion( this.agrupacion );

  }

}