import { Component } from '@angular/core';
import { AgrupacionesService } from '../../services/agrupaciones.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

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
