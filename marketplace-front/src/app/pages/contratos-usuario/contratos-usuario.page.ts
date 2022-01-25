import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contratos-usuario',
  templateUrl: './contratos-usuario.page.html',
  styleUrls: ['./contratos-usuario.page.scss'],
})
export class ContratosUsuarioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  calificar() {
    console.log("contratos");
  }
}
