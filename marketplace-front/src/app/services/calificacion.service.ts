import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  headers;
  constructor(private http:HttpClient,
    private usuarioService: UsuarioService) {
     }

     crearCalificacion(calificacion) {
      /*  this.headers = new HttpHeaders({
          'x-token': this.usuarioService?this.usuarioService.token:'' 
        })*/
        let options = { headers: this.headers};
        return this.http.post(URL + '/calificacion/crearCalificacion', calificacion, options) ;
      }


      getPromedios(){
        let options = { headers: this.headers };
  
        return this.http.get( URL+ '/promedio/promedios', options );
      }
}
