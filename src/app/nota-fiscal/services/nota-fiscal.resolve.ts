import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { NotaFiscal } from '../models/nota-fiscal';
import { NotaFiscalService } from './nota-fiscal.service';

@Injectable()
export class NotaFiscalResolve implements Resolve<NotaFiscal> {

  constructor(private notaFiscalService: NotaFiscalService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.notaFiscalService.obterPorId(route.params.id);
  }
}
