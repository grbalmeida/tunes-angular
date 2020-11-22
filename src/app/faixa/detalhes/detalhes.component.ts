import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Faixa } from '../models/faixa';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  faixa: Faixa;

  constructor(private route: ActivatedRoute) {

    this.faixa = this.route.snapshot.data.faixa;
  }

}
