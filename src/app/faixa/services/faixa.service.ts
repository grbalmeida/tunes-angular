import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { Faixa } from '../models/faixa';
import { FaixaFiltro } from '../models/faixaFiltro';

@Injectable()
export class FaixaService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  obterTodos(): Observable<Faixa[]> {
    return this.http
      .get<Faixa[]>(this.UrlServiceV1 + 'faixas', super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  filtro(filtro: FaixaFiltro): Observable<Faixa[]> {
    const params = new HttpParams({
      fromObject: {
        nome: filtro.nome ?? '',
        compositor: filtro.compositor ?? '',
        album: filtro.album ?? '',
        tipoDeMidiaId: filtro.tipoDeMidiaId ? filtro.tipoDeMidiaId.toString() : '',
        generoId: filtro.generoId ? filtro.generoId.toString() : ''
      }
    });

    return this.http
      .get<Faixa[]>(this.UrlServiceV2 + 'faixas',
      {
        ...super.ObterAuthHeaderJson(),
        params
      })
      .pipe(catchError(super.serviceError)) as Observable<Faixa[]>;
  }

  obterPorId(id: number): Observable<Faixa> {
    return this.http
      .get<Faixa>(this.UrlServiceV1 + 'faixas/' + id, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  novaFaixa(faixa: Faixa): Observable<Faixa> {
    return this.http
      .post(this.UrlServiceV1 + 'faixas', faixa, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  atualizarFaixa(faixa: Faixa): Observable<Faixa> {
    return this.http
      .put(this.UrlServiceV1 + 'faixas/' + faixa.faixaId, faixa, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  excluirFaixa(id: number): Observable<Faixa> {
    return this.http
      .delete(this.UrlServiceV1 + 'faixas/' + id, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }
}
