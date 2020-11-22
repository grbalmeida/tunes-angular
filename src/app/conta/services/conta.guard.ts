import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';

import { CadastroComponent } from '../cadastro/cadastro.component';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { HOME } from 'src/app/shared/routes';
import { ABANDONAR_FORMULARIO } from 'src/app/shared/messages';

@Injectable()
export class ContaGuard implements CanDeactivate<CadastroComponent>, CanActivate {

  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) { }

  canDeactivate(component: CadastroComponent) {
    if (component.mudancasNaoSalvas) {
      return window.confirm(ABANDONAR_FORMULARIO);
    }

    return true;
  }

  canActivate() {
    if (this.localStorageUtils.obterTokenUsuario()) {
      this.router.navigate([HOME]);
    }

    return true;
  }
}
