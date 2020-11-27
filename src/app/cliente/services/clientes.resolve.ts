import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Cliente } from '../models/cliente';
import { ClienteService } from './cliente.service';

@Injectable()
export class ClientesResolve implements Resolve<Cliente[]> {

  constructor(private clienteService: ClienteService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.clienteService.obterTodos();
  }
}
