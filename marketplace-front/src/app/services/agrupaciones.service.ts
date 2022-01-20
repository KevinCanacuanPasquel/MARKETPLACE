import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  headers;

  constructor( private http:HttpClient,
               private usuarioService: UsuarioService ) {
               
                }

  getAgrupaciones( pull:boolean = false) {

    if ( pull ) {
      this.paginaAgrupaciones = 0;
    }

    this.paginaAgrupaciones ++;
    
    return this.http.get<RespuestaAgrupaciones>(`${ URL }/agrupacion/agrupaciones?pagina=${ this.paginaAgrupaciones }`);

  }

  crearAgrupacion( agrupacion ) {
    this.headers = new HttpHeaders({
      'x-token': this.usuarioService.token 
    });
    let options = { headers: this.headers};
    return this.http.post(URL + '/agrupacion/crearAgrupacion', agrupacion, options) ;
  }
  actualizarAgrupacion( agrupacion ) {
    
    let options = { headers: this.headers};
    return this.http.put(URL + '/agrupacion/actualizarAgrupacion', agrupacion, options) ;
  }

  getAgrupacionesByUsuario(userId){
 
   
    let params = new HttpParams();
    params = params.set('userId', userId );
    let options = { headers: this.headers, params: params };
  
    return this.http.get<RespuestaAgrupaciones>( URL+ '/agrupacion/agrupacionesByUsuario',options );
  }
}


