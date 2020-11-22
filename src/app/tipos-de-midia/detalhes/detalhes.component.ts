import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TipoMidia } from '../models/tipo-midia';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  tipoMidia: TipoMidia;

  constructor(private route: ActivatedRoute) {

    this.tipoMidia = this.route.snapshot.data.tipoMidia;
  }

}
