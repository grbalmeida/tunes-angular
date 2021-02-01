import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { Playlist } from '../models/playlist';
import { PlaylistFiltro } from '../models/playlist-filtro';

@Injectable()
export class PlaylistService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  obterTodos(): Observable<Playlist[]> {
    return this.http
      .get<Playlist[]>(this.UrlServiceV1 + 'playlists', super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  filtro(filtro: PlaylistFiltro): Observable<Playlist[]> {
    const params = {
      nome: filtro.nome ?? ''
    }

    return this.http
      .get<Playlist[]>(this.UrlServiceV2 + 'playlists',
      {
        ...super.ObterAuthHeaderJson(),
        params
      })
      .pipe(catchError(super.serviceError));
  }

  obterPorId(id: number): Observable<Playlist> {
    return this.http
      .get<Playlist>(this.UrlServiceV1 + 'playlists/' + id, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  novaPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http
      .post(this.UrlServiceV1 + 'playlists', playlist, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  atualizarPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http
      .put(this.UrlServiceV1 + 'playlists/' + playlist.playlistId, playlist, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  excluirPlaylist(id: number): Observable<Playlist> {
    return this.http
      .delete(this.UrlServiceV1 + 'playlists/' + id, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }
}
