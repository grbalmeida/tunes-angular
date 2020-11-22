import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { ACESSO_NEGADO, CONTA_LOGIN } from '../shared/routes';

import { LocalStorageUtils } from '../utils/localstorage';

export abstract class BaseGuard {
  private localStorageUtils = new LocalStorageUtils();

  constructor(protected router: Router) { }

  protected validarClaims(routeAc: ActivatedRouteSnapshot): boolean {
    if (!this.localStorageUtils.obterTokenUsuario()) {
      this.router.navigate([CONTA_LOGIN], { queryParams: { returnUrl: this.router.url } });
    }

    const user = this.localStorageUtils.obterUsuario();
    let claim: any = routeAc.data[0];

    if (claim !== undefined) {
      claim = routeAc.data[0].claim;

      if (claim) {
        if (!user.claims) {
          this.navegarAcessoNegado();
        }

        const userClaims = user.claims.find(x => x.type === claim.nome);

        if (!userClaims) {
          this.navegarAcessoNegado();
        }

        const valoresClaim = userClaims.value as string;

        if (!valoresClaim.includes(claim.valor)) {
          this.navegarAcessoNegado();
        }
      }
    }

    return true;
  }

  private navegarAcessoNegado() {
    this.router.navigate([ACESSO_NEGADO]);
  }
}
