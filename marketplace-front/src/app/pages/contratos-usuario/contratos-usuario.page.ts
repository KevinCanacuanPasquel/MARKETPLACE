import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StarRatingComponent } from 'ng-starrating';
import { BehaviorSubject } from 'rxjs';
import { StarsComponent } from 'src/app/components/stars/stars.component';
import { AgendaService } from 'src/app/services/agenda.service';
import { CalificacionService } from 'src/app/services/calificacion.service';

@Component({
  selector: 'app-contratos-usuario',
  templateUrl: './contratos-usuario.page.html',
  styleUrls: ['./contratos-usuario.page.scss'],
})
export class ContratosUsuarioPage implements OnInit {

  idCliente;
  calificacion = {
    numEstrellas: 0,
    comentario : '',
    servicio : '',
    usuario : '',
    estado : 'ACTIVO',
    fechaCreacion: new Date()

  }
  contratos = []
  enableCalificarButton;
  enableCalificar = new BehaviorSubject<boolean>(false);
  constructor(private agendaService: AgendaService, private calificacionService: CalificacionService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.idCliente = localStorage.getItem("id")
    this.getContratos();
  }

  getContratos(){
    
    this.agendaService.getAgendaByCliente(this.idCliente).subscribe((data: any)=> {
      if(data.ok){
        console.log(data.agendas)

        this.contratos = data.agendas
        this.contratos.map(this.changeDataFormatsForAgenda)
      console.log( this.contratos)
      }
    })
  }


  async calificar(contrato) {
    const modal = await this.modalCtrl.create({
      component: StarsComponent,
      componentProps: { 
        agenda: contrato
      }
   
    });

    modal.onDidDismiss()
    .then((data:any) => {
      console.log("el contrato", contrato)
     
      this.calificacion.servicio =  contrato.servicio
      this.calificacion.usuario =  contrato.cliente
      this.calificacion.numEstrellas  = data.data.valor 
      this.calificacion.comentario = data.data.comentario 

    
      let wrapperEnvio = { 
        calificacion : this.calificacion,
        agenda : contrato
      }
       this.calificacionService.crearCalificacion(wrapperEnvio).subscribe((resp: any)=> {
         console.log(resp)
       })
      console.log("calificacion", this.calificacion)
      console.log( data," data")
          // Here's your selected user!
  });
  return await modal.present();
}



  changeDataFormatsForAgenda(item){
    item.fechaAgenda = item.fechaAgenda.split("T")[0]
    item.horaInicio = item.horaInicio.split("T")[1]
    item.horaFin = item.horaFin.split("T")[1]

    return item;  

  }
}
