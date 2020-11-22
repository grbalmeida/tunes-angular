import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Album } from '../models/album';
import { AlbumService } from './album.service';

@Injectable()
export class AlbumResolve implements Resolve<Album> {

  constructor(private albumService: AlbumService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.albumService.obterPorId(route.params.id);
  }
}
