import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { NotaFiscal } from '../models/nota-fiscal';

@Injectable()
export class NotaFiscalService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  obterTodos(): Observable<NotaFiscal[]> {
    return this.http
      .get<NotaFiscal[]>(this.UrlServiceV1 + 'notas-fiscais', super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  obterPorId(id: number): Observable<NotaFiscal> {
    return this.http
      .get<NotaFiscal>(this.UrlServiceV1 + 'notas-fiscais/' + id, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  novaNotaFiscal(notaFiscal: NotaFiscal): Observable<NotaFiscal> {
    return this.http
      .post(this.UrlServiceV1 + 'notas-fiscais', notaFiscal, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  atualizarNotaFiscal(notaFiscal: NotaFiscal): Observable<NotaFiscal> {
    return this.http
      .put(this.UrlServiceV1 + 'notas-fiscais/' + notaFiscal.notaFiscalId, notaFiscal, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  excluirNotaFiscal(id: number): Observable<NotaFiscal> {
    return this.http
      .delete(this.UrlServiceV1 + 'notas-fiscais/' + id, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }
}
