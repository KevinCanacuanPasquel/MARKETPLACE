import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { RespuestaAgrupaciones, RespuestaUsuario, Usuario } from '../interfaces/interfaces';

//URL = localhost:3000
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  headers;
  token:string= null;
  private usuario:Usuario = {};

  constructor( private http:HttpClient,
               private storage: Storage,
               private navCtrl: NavController ) {  }

    
  //Login y creacion de token
  login( correo:string, contrasena: string ) {

    const data = { correo, contrasena };

    return new Promise ( resolve => {

      this.http.post( `${ URL }/user/login`, data ).
        subscribe( resp => {
          console.log( resp );

          if ( resp['ok'] ) {
            this.storage.create();
            this.guardarToken( resp['token'] );
            resolve(true);
          } else {
            this.token = null;
            this.storage.create();
            this.storage.clear();
            resolve(false);
          }

      });

    } );

    
  }

  //Logout
  logout() {
    this.token = null;
    this.usuario = null;
    this.storage.create();
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', {animated: true});
  }




  //Guardar token en storage
  async guardarToken( token:string ) {

    this.token = token;
    
    this.storage.create();
    await this.storage.set('token', token);

  }

  //Registro de Usuario
  registro( Usuario:Usuario ) {

    return new Promise( resolve => {

      this.http.post( `${ URL }/user/crearUsuario`, Usuario )
        .subscribe( resp => {
          console.log(resp);
          
          if ( resp['ok'] ) {
            this.storage.create();
            this.guardarToken( resp['token'] );
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }

        });


    });

  }

  async cargarToken() {
    this.storage.create();
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean> {
console.log("entra a validar");
     this.storage.create();
    await this.cargarToken();
    if ( !this.token ) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }


    return new Promise<boolean>( resolve => {
      
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      
      this.http.get(`${ URL }/user/`, { headers })
        .subscribe( resp => {

          if ( resp['ok']) {
            this.usuario = resp[ 'usuario' ];
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }

        })

    });
  }


  async getUsuario() {
    console.log("entra aqui",this.usuario,!this.usuario._id)
    if ( !this.usuario._id ) {
      await this.validaToken();
    }
    
    return { ...this.usuario };

  }




  //Actualizar Usuario
  actualizarUsuario( usuario: Usuario ) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise( resolve => {
      this.http.post(`${ URL }/user/actualizarUsuario`, usuario, { headers })
      .subscribe( resp => {

        if ( resp['ok']) {
          this.guardarToken( resp['token'] );
          resolve(true);
        } else {
          resolve(false);
        }

      });
    });

    
  }

//usuario by id

getUsuarioById(userId){
  let params = new HttpParams();
  params = params.set('userId', userId );
  let options = { headers: this.headers, params: params };

  return this.http.get<RespuestaUsuario>( URL+ '/user/getUsuarioById',options );
}



getUsuarios(){
  let options = { headers: this.headers };

  return this.http.get( URL+ '/user/usuarios', options );
}
}
