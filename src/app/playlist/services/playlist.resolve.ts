import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Playlist } from '../models/playlist';
import { PlaylistService } from './playlist.service';

@Injectable()
export class PlaylistResolve implements Resolve<Playlist> {

  constructor(private playlistService: PlaylistService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.playlistService.obterPorId(route.params.id);
  }
}
