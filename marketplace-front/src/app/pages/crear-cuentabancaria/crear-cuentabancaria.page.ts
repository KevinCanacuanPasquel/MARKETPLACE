import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CuentaBancariaService } from 'src/app/services/cuenta-bancaria.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-cuentabancaria',
  templateUrl: './crear-cuentabancaria.page.html',
  styleUrls: ['./crear-cuentabancaria.page.scss'],
})
export class CrearCuentabancariaPage implements OnInit {

  bancos = ["BANCO PICHINCHA", "PRODUBANCO", "BANCO DEL PACIFICO", "BANCO DEL AUSTRO"]
  titulo = "Crear Cuenta Bancaria";
  usuario;
  item;
  cuentaBancaria = {
    _id:"",
    banco:"",
    tipoCuenta: "",
    cuentaBancaria: "",
    CIBancaria: "",
    estado: "",
  }

  disableEditarButton;
  disableEditar = new BehaviorSubject<boolean>(false);
  disableCrearButton;
  disableCrear = new BehaviorSubject<boolean>(false);

 

  constructor(private cbService: CuentaBancariaService, private usuarioService: UsuarioService , private router: Router,
    private uiService: UiServiceService) {
        
    this.disableEditarButton   = this.disableEditar.asObservable();
    this.disableCrearButton   = this.disableCrear.asObservable();
    this.disableCrear.next(true);
    if (this.router.getCurrentNavigation().extras.state) {

      let bool = false;
      this.titulo = "Editar Agrupacion";
      
      
      this.item = this.router.getCurrentNavigation().extras.state.item;
      console.log("item", this.item)
      // this.agrupacion.fotos = this.item.fotos
      this.cuentaBancaria._id = this.item._id
      this.cuentaBancaria.banco = this.item.banco
      this.cuentaBancaria.tipoCuenta = this.item.tipoCuenta
      this.cuentaBancaria.CIBancaria = this.item.CIBancaria
      this.cuentaBancaria.cuentaBancaria = this.item.cuentaBancaria
      this.cuentaBancaria.estado = this.item.estado
      this.disableCrear.next(false);
      this.disableEditar.next(true);
  }
   }

  ngOnInit() {

}

  tipodeCuenta() {

  }

  crearCuentaBancaria(){
    console.log("a  crear" ,this.cuentaBancaria)
    this.cbService.crearCuentaBancaria(this.cuentaBancaria).subscribe((data:any)=>{
      if(data){
        console.log(data)
        this.router.navigate(['/cuentas-bancarias' ]);

      }
    })
  }
  actualizarCuentaBancaria(){
    console.log("actualizar",  this.cuentaBancaria );
    this.cbService.actualizarCuentaBancaria( this.cuentaBancaria ).subscribe((data:any)=>{
      console.log(data.ok)
      if(data.ok){
        this.router.navigate(['/cuentas-bancarias' ]);
        this.disableEditar.next(false);
      }else{
        this.uiService.alertaActualizacionUsuario(' Error al actualizar agrupacion ');
      }
 
    },error =>{
      
    });
  }


  
}
