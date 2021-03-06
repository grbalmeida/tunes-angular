import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TipoMidia } from '../models/tipo-midia';
import { TipoMidiaService } from './tipo-midia.service';

@Injectable()
export class TipoMidiaResolve implements Resolve<TipoMidia> {

  constructor(private tipoMidiaService: TipoMidiaService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.tipoMidiaService.obterPorId(route.params.id);
  }
}
