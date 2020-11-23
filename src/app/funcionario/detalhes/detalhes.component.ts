import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Funcionario } from '../models/funcionario';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  funcionario: Funcionario;

  constructor(private route: ActivatedRoute) {

    this.funcionario = this.route.snapshot.data.funcionario;
  }

}
