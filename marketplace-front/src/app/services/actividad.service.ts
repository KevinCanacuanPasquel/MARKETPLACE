import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaActividades } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})



export class ActividadService {

  headers;

  constructor(private http:HttpClient) { }




  getAllActividades(){
    let params = new HttpParams();
    
    let options = { headers: this.headers};
  
    return this.http.get<RespuestaActividades>( URL+ '/actividad/getActividad',options );
  }


  crearActividad(actividad) {

    let options = { headers: this.headers};
    return this.http.post(URL + '/actividad/crearActividad', actividad, options) ;
  }
  getActividadesByArte(arte: string){
    let params = new HttpParams();
    params = params.set('arte', arte );
    let options = { headers: this.headers};
  
    return this.http.get<RespuestaActividades>( URL+ '/actividad/actividadPorPadre',options );
  }

  getActividadesByParams(nombre, arte, estado){
    let params = new HttpParams();
    params = params.set('nombre', nombre );
    params = params.set('arte', arte );
    params = params.set('estado', estado );
    let options = { headers: this.headers, params: params};
    return this.http.get<RespuestaActividades>( URL+ '/actividad/actividadPorParametros',options );
  }

  actualizarActividad( actividad ) {

    let options = { headers: this.headers};
    return this.http.put(URL + '/actividad/actualizarActividad', actividad, options) ;
  }

  getArtes(){
   
    let options = { headers: this.headers};
  
    return this.http.get<RespuestaActividades>( URL+ '/actividad/getArtes',options );
  }
}
