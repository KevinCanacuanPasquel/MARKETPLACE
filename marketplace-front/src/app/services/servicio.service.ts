import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';


const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  paginaServicios = 0
  headers;

  constructor(private http:HttpClient, private usuarioService: UsuarioService) {

   }

  crearServicio(servicio) {
    this.headers = new HttpHeaders({
      'x-token': this.usuarioService?this.usuarioService.token:'' 
    })
    let options = { headers: this.headers};
    return this.http.post(URL + '/servicio/crearServicio', servicio, options) ;
  }

  
  getServiciosByAgrupacion(agrupacionId){
    let params = new HttpParams();
    params = params.set('agrupId', agrupacionId );
    let options = { headers: this.headers, params: params };
  
    return this.http.get( URL+ '/servicio/serviciosByAgupacion',options );
  }

  
  getServiciosById(servicioId){
    let params = new HttpParams();
    params = params.set('id', servicioId );
    let options = { headers: this.headers, params: params };
  
    return this.http.get( URL+ '/servicio/servicioById',options );
  }


  actualizarServicio( servicio ) {

    let options = { headers: this.headers};
    return this.http.put(URL + '/servicio/actualizarServicio', servicio, options) ;
  }

  eliminarServicio(servicioId){
    let params = new HttpParams();
    params = params.set('id', servicioId );
    let options = { headers: this.headers, params: params };
    return this.http.delete(URL + '/servicio/eliminarServicio',  options) ;
  }


  
  getServiciosByParams(actividad, arte, pull:boolean = false){
    if ( pull ) {
      this.paginaServicios = 0;
    }

    this.paginaServicios ++;
    let params = new HttpParams();
    params = params.set('actividad', actividad );
    params = params.set('arte', arte );
    params = params.set('estado', "ACTIVO" );
    params = params.set('pagina', this.paginaServicios)
    let options = { headers: this.headers, params: params};
    return this.http.get( URL+ '/servicio/servicioByParametros',options );
  }


  getServicios(){
    let options = { headers: this.headers };
  
    return this.http.get( URL+ '/servicio/servicios', options );
  }

}
