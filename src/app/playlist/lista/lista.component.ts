import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Playlist } from '../models/playlist';
import { PlaylistService } from '../services/playlist.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public playlists: Playlist[];
  errorMessage: string;

  constructor(private playlistService: PlaylistService, private loader: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loader.show();

    this.playlistService.obterTodos()
      .subscribe(
        playlists => this.playlists = playlists,
        error => this.errorMessage,
        () => this.loader.hide()
      );
  }
}
