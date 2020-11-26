import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  cliente: Cliente;

  constructor(private route: ActivatedRoute) {

    this.cliente = this.route.snapshot.data.cliente;
  }

}
