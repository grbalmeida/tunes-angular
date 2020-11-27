import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Faixa } from '../models/faixa';
import { FaixaService } from './faixa.service';

@Injectable()
export class FaixasResolve implements Resolve<Faixa[]> {

  constructor(private faixaService: FaixaService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.faixaService.obterTodos();
  }
}
