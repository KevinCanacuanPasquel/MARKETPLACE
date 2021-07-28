import { Component, OnInit } from '@angular/core';
import { AgrupacionesService } from '../../services/agrupaciones.service';
import { Agrupacion } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  agrupaciones: Agrupacion[] = [];

  habilitado = true;

  constructor( private agrupacionesService: AgrupacionesService ) {}

  ngOnInit() {

    this.siguientes();
    
  }

  //Metodo para cargar nuevas agrupaciones creadas
  recargar( event ) {

    this.siguientes( event, true);
    this.agrupaciones = [];
    this.habilitado = true;

  }

  //Metodo para cargar el infinite scroll
  siguientes( event?, pull:boolean = false ) {

    this.agrupacionesService.getAgrupaciones( pull )
      .subscribe( resp => {
        console.log( resp );
        this.agrupaciones.push( ...resp.agrupaciones );

        if ( event ) {
          event.target.complete();
          if ( resp.agrupaciones.length === 0 ) {
            this.habilitado = false;
          }
        }
    });

  }


}
