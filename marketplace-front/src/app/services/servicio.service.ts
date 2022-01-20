import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';


const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class ServicioService {

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
}
