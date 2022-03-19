import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-gestion-servicios',
  templateUrl: './gestion-servicios.component.html',
  styleUrls: ['./gestion-servicios.component.scss'],
})
export class GestionServiciosComponent implements OnInit {

  constructor(private servicioService: ServicioService) { }

  servicios = []
  ngOnInit() {
    this.getService()
  }



  getService(){
    this.servicioService.getServicios().subscribe((data:any)=> {
      console.log(data)
      this.servicios = data.servicios
    })

  }

  eliminarServicio(servicio){
    this.servicioService.eliminarServicio(servicio._id).subscribe((data:any)=>{
      console.log(data)
    })

  }


}


