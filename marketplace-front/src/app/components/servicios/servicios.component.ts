import { Component, Input, OnInit } from '@angular/core';
import { Promedio, Servicio } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent implements OnInit {



  @Input() servicios: Servicio[] = [];
  @Input() promedios: Promedio[]= [];
  constructor() { }

  ngOnInit() {}

}
