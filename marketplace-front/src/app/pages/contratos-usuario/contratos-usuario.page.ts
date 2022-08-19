import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StarRatingComponent } from 'ng-starrating';
import { BehaviorSubject } from 'rxjs';
import { StarsComponent } from 'src/app/components/stars/stars.component';
import { AgendaService } from 'src/app/services/agenda.service';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { TypesUtilsService } from 'src/app/utils/types-utils.service';

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
  constructor(private agendaService: AgendaService, private calificacionService: CalificacionService, private uiService: UiServiceService,
     private modalCtrl: ModalController, private util: TypesUtilsService) { }

  ngOnInit() {
    this.idCliente = localStorage.getItem("id")
    this.getContratos();
  }

  getContratos(){
    
    this.agendaService.getAgendaByCliente(this.idCliente).subscribe((data: any)=> {
      if(data.ok){
        console.log(data.agendas)
        if(data.agendas.length != 0){
          this.contratos = data.agendas
    //      this.contratos.map(this.changeDataFormatsForAgenda)
        }
        else{
          this.uiService.alertaActualizacionUsuario("no existen eventos")
        }
       
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
    /*  componentProps: {
        'nombre': 'Aitor',
        'apellidos': 'Sánchez',
        'locale': 'es_ES'
      }*/
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
    console.log("la hora de inicio",item.horaInicio)
    let fechaSpliteada =item.horaInicio.split("T")
    item.fechaAgenda = fechaSpliteada[0];
 
    item.horaInicio = new Date(item.horaInicio).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

   item.horaFin =  new Date(item.horaFin).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    return item;  

  }

  transformHourToAm(date){
   return this.util.getHourAmPmFormat(date)
  }

   
	formatDateToString(date ) {
    let str : string;
    new Date(date)
    if( date !=null ) {
        let day = date.getDay().toString;
        let month : any = date.getMonth()+1;
        month = month.toString;
        let year : any = date.getFullYear()+1900;
        year = year.toString;
        let hour = date.getHours.toString;
        let minutes = date.getMinutes.toString;
        let seconds = date.getSeconds.toString;
        str =  day+'/'+month+"/"+year+' '+hour+':'+minutes+':'+seconds;
        return str;
    } else {
        return null;
    }
}


getHourAmPmFormat(date: Date){

  return	date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  
}
  
}
