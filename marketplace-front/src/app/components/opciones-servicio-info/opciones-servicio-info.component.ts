import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-opciones-servicio-info',
  templateUrl: './opciones-servicio-info.component.html',
  styleUrls: ['./opciones-servicio-info.component.scss'],
})
export class OpcionesServicioInfoComponent implements OnInit {

  constructor(private popoverCtrl: PopoverController,
              private navCtrl: NavController ) { }

  agrupacionValue

  ngOnInit() {}

  onClick(valor:string) {

    if(valor==="modificar") {
      this.popoverCtrl.dismiss(
        this.navCtrl.navigateRoot( '/crear-servicio', { animated: true, state: { item: this.agrupacionValue }})
        );
    } else if(valor==="desactivar") {
      this.popoverCtrl.dismiss(
        console.log("DESACTIVAR SERVICIO")
      );
    } else {
      this.popoverCtrl.dismiss(
        console.log("ELIMINAR SERVICIO")
      );
    }
    
    
  }


}
