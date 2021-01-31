import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ERRO_DESCONHECIDO } from '../shared/messages';
import { LocalStorageUtils } from '../utils/localstorage';

export abstract class BaseService {
  public LocalStorage = new LocalStorageUtils();
  protected UrlServiceV1 = environment.apiUrlv1;
  protected UrlServiceV2 = environment.apiUrlv2;

  protected ObterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  protected ObterAuthHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.LocalStorage.obterTokenUsuario()}`
      })
    };
  }

  protected extractData(response: any) {
    return response.data || {};
  }

  protected serviceError(response: Response | any) {
    const customError: string[] = [];

    if (response instanceof HttpErrorResponse) {
      if (response.statusText === 'Unknown Error') {
        customError.push(ERRO_DESCONHECIDO);
      } else {
        customError.push(response.error.errors[0]);
      }
    }

    return throwError(response);
  }
}
