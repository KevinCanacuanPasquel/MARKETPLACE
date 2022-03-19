import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ActividadService } from 'src/app/services/actividad.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-gestion-actividad',
  templateUrl: './gestion-actividad.component.html',
  styleUrls: ['./gestion-actividad.component.scss'],
})
export class GestionActividadComponent implements OnInit {

  constructor(private actividadService: ActividadService, private navCtrl: NavController, private uiService: UiServiceService, private router:Router) { }
  nombre;
  arteValue;
  estado = "ACTIVO"
  catalogoArtes = ["","escenica", "musica"]; 
  titulo ="Gestion de Actividades"
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['nombre', 'arte', 'accion']
  ngOnInit() {

    this.getActividadesByParams();
  }


  getActividades(){
    this.actividadService.getAllActividades().subscribe((data:any)=>{
      if(data.ok){
        console.log("data ", data.actividades)
        this.dataSource = new MatTableDataSource<any>(data.actividades);

      }

    })
  }

  getActividadesByParams(){

    this.actividadService.getActividadesByParams(this.nombre? this.nombre: "", this.arteValue? this.arteValue : "", this.estado? this.estado: "").subscribe((data:any)=>{
      console.log(data.actividades)
      this.dataSource = new MatTableDataSource<any>(data.actividades);
    })
  }

 
  
  editarActividad(row){
    console.log(row)
    if(row != null){
      this.navCtrl.navigateRoot( 'actividad/crear-actividad', { state: { item: row }});
    }else{
      this.uiService.alertaActualizacionUsuario(' Debes seleccionar la agrupacion  que deseas editar ');
    }
  }

  eliminarActividad(row){
      row.estado = "INACTIVO"
      this.actividadService.actualizarActividad(row).subscribe((data:any)=>{
        if(data){
          console.log("lo logro")
          this.getActividadesByParams();
        }
      
      })
  }
  crearActividad(){
    this.router.navigate(['/actividad/crear-actividad' ]);
  }
}
