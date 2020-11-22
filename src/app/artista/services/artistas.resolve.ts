import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Artista } from '../models/artista';
import { ArtistaService } from './artista.service';

@Injectable()
export class ArtistasResolve implements Resolve<Artista[]> {

  constructor(private artistaService: ArtistaService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.artistaService.obterTodos();
  }
}
