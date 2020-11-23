import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Funcionario } from '../models/funcionario';
import { FuncionarioService } from './funcionario.service';

@Injectable()
export class FuncionarioResolve implements Resolve<Funcionario> {

  constructor(private funcionarioService: FuncionarioService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.funcionarioService.obterPorId(route.params.id);
  }
}
