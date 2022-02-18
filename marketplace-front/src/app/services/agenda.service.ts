import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';


const URL = environment.url;
@Injectable({
  providedIn: 'root'
})


export class AgendaService {
  headers;

  constructor(private http:HttpClient, private usuarioService: UsuarioService) { }


  crearAgenda(agenda) {
  /*  this.headers = new HttpHeaders({
      'x-token': this.usuarioService?this.usuarioService.token:'' 
    })*/
    let options = { headers: this.headers};
    return this.http.post(URL + '/agenda/crearAgenda', agenda, options) ;
  }
}
