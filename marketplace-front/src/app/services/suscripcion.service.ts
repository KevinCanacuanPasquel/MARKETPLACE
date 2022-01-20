import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  headers;
  
  constructor(private http:HttpClient, private usuarioService: UsuarioService) { }



  
  crearSuscripcion(servicio) {
 
    let options = { headers: this.headers};
    return this.http.post(URL + '/suscripcion/crearSuscripcion', servicio ) ;
  }

}
