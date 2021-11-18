import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cuentas-bancarias',
  templateUrl: './cuentas-bancarias.page.html',
  styleUrls: ['./cuentas-bancarias.page.scss'],
})
export class CuentasBancariasPage implements OnInit {

  constructor( private navCtrl: NavController) { }

  ngOnInit() {
  }

  crearCuentaBancaria(){
    this.navCtrl.navigateRoot( '/crear-cuentabancaria', { animated: true });
  }

  editarCuentaBancaria(){
    this.navCtrl.navigateRoot( '/crear-cuentabancaria', { animated: true });
  }

  eliminarCuentaBancaria(){
    
  }

}
