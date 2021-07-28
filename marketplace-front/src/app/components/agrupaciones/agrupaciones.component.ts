import { Component, Input, OnInit } from '@angular/core';
import { Agrupacion } from '../../interfaces/interfaces';

@Component({
  selector: 'app-agrupaciones',
  templateUrl: './agrupaciones.component.html',
  styleUrls: ['./agrupaciones.component.scss'],
})
export class AgrupacionesComponent implements OnInit {

  @Input() agrupaciones: Agrupacion[] = [];

  constructor() { }

  ngOnInit() {

    console.log(this.agrupaciones);

  }

}
