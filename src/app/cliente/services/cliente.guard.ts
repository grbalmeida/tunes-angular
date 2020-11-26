import { Injectable } from '@angular/core';
import { CanDeactivate, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { NovoComponent } from '../novo/novo.component';
import { BaseGuard } from 'src/app/services/base.guard';
import { ABANDONAR_FORMULARIO } from 'src/app/shared/messages';

@Injectable()
export class ClienteGuard extends BaseGuard implements CanActivate, CanDeactivate<NovoComponent> {

  constructor(protected router: Router) {
    super(router);
  }

  canDeactivate(component: NovoComponent) {
    if (component.mudancasNaoSalvas) {
      return window.confirm(ABANDONAR_FORMULARIO);
    }

    return true;
  }

  canActivate(routeAc: ActivatedRouteSnapshot) {
    return this.validarClaims(routeAc);
  }
}