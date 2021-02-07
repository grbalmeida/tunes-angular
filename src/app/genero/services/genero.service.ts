import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { Genero } from '../models/genero';
import { GeneroFiltro } from '../models/genero-filtro';

@Injectable()
export class GeneroService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  obterTodos(): Observable<Genero[]> {
    return this.filtro({ nome: '' });
  }

  filtro(filtro: GeneroFiltro): Observable<Genero[]> {
    const params = {
      nome: filtro.nome ?? ''
    }

    return this.http
      .get<Genero[]>(this.UrlServiceV2 + 'generos',
      {
        ...super.ObterAuthHeaderJson(),
        params
      })
      .pipe(catchError(super.serviceError));
  }

  obterPorId(id: number): Observable<Genero> {
    return this.http
      .get<Genero>(this.UrlServiceV1 + 'generos/' + id, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  novoGenero(genero: Genero): Observable<Genero> {
    return this.http
      .post(this.UrlServiceV1 + 'generos', genero, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  atualizarGenero(genero: Genero): Observable<Genero> {
    return this.http
      .put(this.UrlServiceV1 + 'generos/' + genero.generoId, genero, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  excluirGenero(id: number): Observable<Genero> {
    return this.http
      .delete(this.UrlServiceV1 + 'generos/' + id, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }
}
