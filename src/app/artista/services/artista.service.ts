import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { Artista } from '../models/artista';
import { ArtistaFiltro } from '../models/artista-filtro';

@Injectable()
export class ArtistaService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  obterTodos(): Observable<Artista[]> {
    return this.filtro({ nome: '' });
  }

  filtro(filtro: ArtistaFiltro): Observable<Artista[]> {
    const params = {
      nome: filtro.nome ?? ''
    };

    return this.http
      .get<Artista[]>(this.UrlServiceV2 + 'artistas',
      {
        ...super.ObterAuthHeaderJson(),
        params
      })
      .pipe(catchError(super.serviceError));
  }

  excel(filtro: ArtistaFiltro): Observable<Blob> {
    const params = {
      nome: filtro.nome ?? ''
    };

    return this.http
      .get<Artista[]>(this.UrlServiceV2 + 'artistas/excel',
      {
        ...super.ObterAuthHeaderJson(),
        responseType: 'blob' as 'json',
        params
      })
      .pipe(catchError(super.serviceError)) as Observable<Blob>;
  }

  obterPorId(id: number): Observable<Artista> {
    return this.http
      .get<Artista>(this.UrlServiceV1 + 'artistas/' + id, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  novoArtista(artista: Artista): Observable<Artista> {
    return this.http
      .post(this.UrlServiceV1 + 'artistas', artista, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  atualizarArtista(artista: Artista): Observable<Artista> {
    return this.http
      .put(this.UrlServiceV1 + 'artistas/' + artista.artistaId, artista, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  excluirArtista(id: number): Observable<Artista> {
    return this.http
      .delete(this.UrlServiceV1 + 'artistas/' + id, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }
}
