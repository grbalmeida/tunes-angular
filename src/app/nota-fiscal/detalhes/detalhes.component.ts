import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotaFiscal } from '../models/nota-fiscal';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  notaFiscal: NotaFiscal;

  constructor(private route: ActivatedRoute) {

    this.notaFiscal = this.route.snapshot.data.notaFiscal;
  }

}
