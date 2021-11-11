import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.scss'],
})
export class CrearActividadComponent implements OnInit {
  item
  titulo="Crear Actividad";
  actividad = {
    nombre: "",
    arte: ""
  }

  enableEditarButton;
  enableEditar = new BehaviorSubject<boolean>(false);
  enableCrearButton;
  enableCrear = new BehaviorSubject<boolean>(false);
  constructor(private actividadService: ActividadService, private router: Router) {
    this.enableEditarButton   = this.enableEditar.asObservable();
    this.enableCrearButton   = this.enableCrear.asObservable();
    this.enableCrear.next(true);
   }

  ngOnInit() {

    if (this.router.getCurrentNavigation().extras.state) {

      let bool = false;
      this.titulo = "Editar Agrupacion";
      
      
      this.item = this.router.getCurrentNavigation().extras.state.item;
      console.log("item", this.item)
      // this.agrupacion.fotos = this.item.fotos
      this.actividad.nombre = this.item.nombre
      this.actividad.arte = this.item.arte
     
      this.enableEditar.next(true);
      this.enableCrear.next(false);
    
    }
    console.log(this.actividad)
  }


  crearActividad(){
    this.actividadService.crearAgrupacion(this.actividad).subscribe((data:any)=>{
      if(data.ok){
        console.log("lo logro", data.actividad)
      }
    })
  }
  actualizarActividad(){

  }


  
}
