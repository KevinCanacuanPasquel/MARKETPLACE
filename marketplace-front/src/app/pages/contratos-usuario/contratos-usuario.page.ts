import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-contratos-usuario',
  templateUrl: './contratos-usuario.page.html',
  styleUrls: ['./contratos-usuario.page.scss'],
})
export class ContratosUsuarioPage implements OnInit {

  idCliente;
  contratos = []
  enableCalificarButton;
  enableCalificar = new BehaviorSubject<boolean>(false);
  constructor(private agendaService: AgendaService) { }

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

  calificar() {
    console.log("contratos");
  }



  changeDataFormatsForAgenda(item){
    item.fechaAgenda = item.fechaAgenda.split("T")[0]
    item.horaInicio = item.horaInicio.split("T")[1]
    item.horaFin = item.horaFin.split("T")[1]

    return item;  

  }
}
