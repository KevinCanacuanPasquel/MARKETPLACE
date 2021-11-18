import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-crear-cuentabancaria',
  templateUrl: './crear-cuentabancaria.page.html',
  styleUrls: ['./crear-cuentabancaria.page.scss'],
})
export class CrearCuentabancariaPage implements OnInit {

  titulo = "Crear Cuenta Bancaria";

  cuentaBancaria = {
    id:'',
    banco:'',
    tipodecuenta: '',
    numcuenta: 0,
    cicuenta: 0
  }

  disableEditarButton;
  disableEditar = new BehaviorSubject<boolean>(false);
  disableCrearButton;
  disableCrear = new BehaviorSubject<boolean>(false);

  public form = [
    { val: 'Ahorros', isChecked: true },
    { val: 'Corriente', isChecked: false },
  ];

  constructor() { }

  ngOnInit() {
  }

  tipodeCuenta() {

  }

 

}
