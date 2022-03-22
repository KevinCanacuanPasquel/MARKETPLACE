import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.scss'],
})
export class GestionUsuariosComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  usuarios = [];
  ngOnInit() {
    this.getUsuarios();
  }



  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe((data:any)=> {
      this.usuarios =  data.usuarios
      
    })
  }

  eliminarUsuario(){

  }
}
