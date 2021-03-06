import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Genero } from '../models/genero';
import { GeneroService } from './genero.service';

@Injectable()
export class GenerosResolve implements Resolve<Genero[]> {

  constructor(private generoService: GeneroService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.generoService.obterTodos();
  }
}
