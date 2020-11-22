import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Artista } from '../models/artista';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  artista: Artista;

  constructor(private route: ActivatedRoute) {

    this.artista = this.route.snapshot.data.artista;
  }

}
