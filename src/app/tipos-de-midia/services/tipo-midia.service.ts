import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { TipoMidia } from '../models/tipo-midia';
import { TipoMidiaFiltro } from '../models/tipo-midia-filtro';

@Injectable()
export class TipoMidiaService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  obterTodos(): Observable<TipoMidia[]> {
    return this.filtro({ nome: '' });
  }

  filtro(filtro: TipoMidiaFiltro): Observable<TipoMidia[]> {
    const params = {
      nome: filtro.nome ?? ''
    }

    return this.http
      .get<TipoMidia[]>(this.UrlServiceV2 + 'tipos-de-midia',
      {
        ...super.ObterAuthHeaderJson(),
        params
      })
      .pipe(catchError(super.serviceError));
  }

  obterPorId(id: number): Observable<TipoMidia> {
    return this.http
      .get<TipoMidia>(this.UrlServiceV1 + 'tipos-de-midia/' + id, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  novoTipoMidia(tipoMidia: TipoMidia): Observable<TipoMidia> {
    return this.http
      .post(this.UrlServiceV1 + 'tipos-de-midia', tipoMidia, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  atualizarTipoMidia(tipoMidia: TipoMidia): Observable<TipoMidia> {
    return this.http
      .put(this.UrlServiceV1 + 'tipos-de-midia/' + tipoMidia.tipoMidiaId, tipoMidia, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  excluirTipoMidia(id: number): Observable<TipoMidia> {
    return this.http
      .delete(this.UrlServiceV1 + 'tipos-de-midia/' + id, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }
}
