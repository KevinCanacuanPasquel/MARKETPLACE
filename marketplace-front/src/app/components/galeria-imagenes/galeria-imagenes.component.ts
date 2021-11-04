import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataUpload } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-galeria-imagenes',
  templateUrl: './galeria-imagenes.component.html',
  styleUrls: ['./galeria-imagenes.component.scss'],
})
export class GaleriaImagenesComponent implements OnInit {

  listaImagenes;
  @Input() set listaImagenesInput(object: Array<DataUpload>) {
    this.dataObservableImagenes.next(object);
  } 
  private dataObservableImagenes: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() { }

  ngOnInit() {
    this.dataObservableImagenes.subscribe((async p =>{
      this.listaImagenes= p;
    }))
  }

}
