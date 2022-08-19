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

  idUsuario;
  cuentasBancarias
  constructor( private navCtrl: NavController, private usuarioService: UsuarioService, private cuentaBancariaService: CuentaBancariaService) { }

  ngOnInit() {
    this.idUsuario = localStorage.getItem("id")
    this.getCuentasBancarias();
  }

  crearCuentaBancaria(){
    this.navCtrl.navigateRoot( '/crear-cuentabancaria', { animated: true });
  }

  editarCuentaBancaria(cuenta){
    this.navCtrl.navigateRoot( '/crear-cuentabancaria', { state: { item: cuenta }});
  }

  eliminarCuentaBancaria(row){
    row.estado = "INACTIVO"
    this.cuentaBancariaService.actualizarCuentaBancaria(row).subscribe((data:any)=>{
      if(data){
        console.log("lo logro")
        this.getCuentasBancarias();
      }
    
    })
}
activarCuentaBancaria(row){
  row.estado = "ACTIVO"
  this.cuentaBancariaService.actualizarCuentaBancaria(row).subscribe((data:any)=>{
    if(data){
      console.log("lo logro")
      this.getCuentasBancarias();
    }
  
  })
}

   getCuentasBancarias(){
   
    console.log(this.idUsuario)
    this.cuentaBancariaService.getCuentaBancariaByUsuario(this.idUsuario).subscribe((data:any)=>{
      console.log("cuentasBancarias" ,data.cuentaBancaria);
      this.cuentasBancarias = data.cuentaBancaria
    })
  }

/*
  getDatosUsuario(){
    this.usuarioService.getUsuario().then(p=>{
      console.log("p", p)
     this.usuario= p;
   });
  }
*/
 
}

