import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CuentaBancariaService } from 'src/app/services/cuenta-bancaria.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cuentas-bancarias',
  templateUrl: './cuentas-bancarias.page.html',
  styleUrls: ['./cuentas-bancarias.page.scss'],
})
export class CuentasBancariasPage implements OnInit {

  usuario;
  cuentasBancarias
  constructor( private navCtrl: NavController, private usuarioService: UsuarioService, private cuentaBancaria: CuentaBancariaService) { }

  ngOnInit() {
    this.getCuentasBancarias();
  }

  crearCuentaBancaria(){
    this.navCtrl.navigateRoot( '/crear-cuentabancaria', { animated: true });
  }

  editarCuentaBancaria(cuenta){
    this.navCtrl.navigateRoot( '/crear-cuentabancaria', { state: { item: cuenta }});
  }

  eliminarCuentaBancaria(){
    
  }
  async getCuentasBancarias(){
    await  this.getDatosUsuario();
    console.log(this.usuario._id)
    this.cuentaBancaria.getCuentaBancariaByUsuario(this.usuario._id).subscribe((data:any)=>{
      console.log("cuentasBancarias" ,data.cuentaBancaria);
      this.cuentasBancarias = data.cuentaBancaria
    })
  }


  getDatosUsuario(){
    this.usuarioService.getUsuario().then(p=>{
      console.log("p", p)
     this.usuario= p;
   });
  }

 
}

