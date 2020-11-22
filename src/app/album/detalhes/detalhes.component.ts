import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Album } from '../models/album';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  album: Album;

  constructor(private route: ActivatedRoute) {

    this.album = this.route.snapshot.data.album;
  }

}
