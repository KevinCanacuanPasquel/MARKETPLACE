import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PopoverController } from '@ionic/angular';
import { OpcionesMasComponent } from 'src/app/components/opciones-mas/opciones-mas.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(private usuarioService:UsuarioService,
              private popoverCtrl:PopoverController) { }

  ngOnInit() {}

  logout() {

    this.usuarioService.logout();

  }
  async mas(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: OpcionesMasComponent,
      event: ev,
      translucent: true,
      backdropDismiss: true
    });
    await popover.present();
     
    
    
  }

}
