import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Funcionario } from '../models/funcionario';
import { FuncionarioService } from './funcionario.service';

@Injectable()
export class FuncionariosResolve implements Resolve<Funcionario[]> {

  constructor(private funcionarioService: FuncionarioService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.funcionarioService.obterTodos();
  }
}
