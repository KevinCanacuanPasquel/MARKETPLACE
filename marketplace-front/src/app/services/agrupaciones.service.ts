import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RespuestaAgrupaciones } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AgrupacionesService {

  paginaAgrupaciones = 0;

  constructor( private http:HttpClient,
               private usuarioService: UsuarioService ) { }

  getAgrupaciones( pull:boolean = false) {

    if ( pull ) {
      this.paginaAgrupaciones = 0;
    }

    this.paginaAgrupaciones ++;
    
    return this.http.get<RespuestaAgrupaciones>(`${ URL }/agrupacion/agrupaciones?pagina=${ this.paginaAgrupaciones }`);

  }

  crearAgrupacion( agrupacion ) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token 
    });

    this.http.post(`${ URL }/agrupacion/crearAgrupacion`, agrupacion, { headers })
      .subscribe( resp => {
        console.log(resp);
      });


  }
}
