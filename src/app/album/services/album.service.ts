import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { Album } from '../models/album';
import { AlbumFiltro } from '../models/album-filtro';

@Injectable()
export class AlbumService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  obterTodos(): Observable<Album[]> {
    return this.filtro({ artista: '', titulo: '' });
  }

  filtro(filtro: AlbumFiltro): Observable<Album[]> {
    const params = {
      titulo: filtro.titulo ?? '',
      artista: filtro.artista ?? ''
    }

    return this.http
      .get<Album[]>(this.UrlServiceV2 + 'albuns',
      {
        ...super.ObterAuthHeaderJson(),
        params
      })
      .pipe(catchError(super.serviceError));
  }

  obterPorId(id: number): Observable<Album> {
    return this.http
      .get<Album>(this.UrlServiceV1 + 'albuns/' + id, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  novoAlbum(album: Album): Observable<Album> {
    return this.http
      .post(this.UrlServiceV1 + 'albuns', album, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  atualizarAlbum(album: Album): Observable<Album> {
    return this.http
      .put(this.UrlServiceV1 + 'albuns/' + album.albumId, album, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  excluirAlbum(id: number): Observable<Album> {
    return this.http
      .delete(this.UrlServiceV1 + 'albuns/' + id, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }
}
