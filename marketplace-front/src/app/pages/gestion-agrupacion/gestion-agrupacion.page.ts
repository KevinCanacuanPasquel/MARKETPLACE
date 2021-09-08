import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { AgrupacionesService } from 'src/app/services/agrupaciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-gestion-agrupacion',
  templateUrl: './gestion-agrupacion.page.html',
  styleUrls: ['./gestion-agrupacion.page.scss'],
})
export class GestionAgrupacionPage implements OnInit {

  usuario: Usuario = {};
  constructor(private usuarioService: UsuarioService, private agrupacionService : AgrupacionesService) { }

  ngOnInit() {
     this.usuario = this.usuarioService.getUsuario();
     
     console.log(this.usuario)
     this.getAgrupaciones();
  }

 
  getAgrupaciones(){
    this.agrupacionService.getAgrupacionesByUsuario(this.usuario._id).subscribe((data:any)=>{
      console.log(data.usuario);
    })
  }

  
}
