import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public clientes: Cliente[];
  errorMessage: string;

  constructor(private clienteService: ClienteService, private loader: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loader.show();

    this.clienteService.obterTodos()
      .subscribe(
        clientes => this.clientes = clientes,
        error => this.errorMessage,
        () => this.loader.hide()
      );
  }
}
