import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Genero } from '../models/genero';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  genero: Genero;

  constructor(private route: ActivatedRoute) {

    this.genero = this.route.snapshot.data.genero;
  }

}
