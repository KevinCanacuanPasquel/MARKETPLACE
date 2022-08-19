import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class CuentaBancariaService {
  headers;
  constructor( private http:HttpClient,
    private usuarioService: UsuarioService ) {
     
     }
crearCuentaBancaria(cuentaBancaria) {
  
  /*  this.headers = new HttpHeaders({
    'x-token': this.usuarioService?this.usuarioService.token:'' 
  })*/
    let options = { headers: this.headers};
    return this.http.post(URL + '/cuenta_bancaria/crearCuentaBancaria', cuentaBancaria, options) ;
  }

  getCuentaBancariaByUsuario(userId){
    let params = new HttpParams();
    params = params.set('userId', userId );
    let options = { headers: this.headers, params: params };
  
    return this.http.get( URL+ '/cuenta_bancaria/cuentaBancariaByUsuario',options );
  }


  
  actualizarCuentaBancaria( cuentaBancaria ) {
    this.headers = new HttpHeaders({
      'x-token': this.usuarioService.token 
    })
    let options = { headers: this.headers};
    return this.http.put(URL + '/cuenta_bancaria/actualizarCuentaBancaria', cuentaBancaria, options) ;
  }
}
