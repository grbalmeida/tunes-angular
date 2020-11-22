import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Playlist } from '../models/playlist';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  playlist: Playlist;

  constructor(private route: ActivatedRoute) {

    this.playlist = this.route.snapshot.data.playlist;
  }

}
