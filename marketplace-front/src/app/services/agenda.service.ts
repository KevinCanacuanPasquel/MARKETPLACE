import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getAgendaByCliente(clienteId){
    let params = new HttpParams();
    params = params.set('clienteId', clienteId );
    let options = { headers: this.headers, params: params };
  
    return this.http.get( URL+ '/agenda/agendaByCliente',options );
  }

  getAgendaByServicio(servicioId){
    let params = new HttpParams();
    params = params.set('servicioId', servicioId );
    let options = { headers: this.headers, params: params };
  
    return this.http.get( URL+ '/agenda/agendaByServicio',options );
  }

  
  getAgendaByAgrupacion(agrupacionId){
    let params = new HttpParams();
    params = params.set('agrupacionId', agrupacionId );
    let options = { headers: this.headers, params: params };
  
    return this.http.get( URL+ '/agenda/agendaByAgrupacion',options );
  }


  actualizarAgenda( agenda ) {
    
    let options = { headers: this.headers};
    return this.http.put(URL + '/agenda/actualizarAgenda', agenda, options) ;
  }
}
