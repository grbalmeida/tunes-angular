import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Playlist } from '../models/playlist';
import { PlaylistFiltro } from '../models/playlist-filtro';
import { PlaylistService } from '../services/playlist.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public playlists: Playlist[];
  playlistFiltro: FormGroup;
  errorMessage: string;

  constructor(
    private playlistService: PlaylistService,
    private loader: NgxSpinnerService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loader.show();

    this.obterTodos();

    this.playlistFiltro = this.fb.group({
      nome: ['']
    })
  }

  filtrar(): void {
    const playlistFiltro = this.playlistFiltro.value as PlaylistFiltro;

    this.playlistService.filtro(playlistFiltro)
      .subscribe(
        playlists => this.playlists = playlists,
        error => this.errorMessage,
        () => this.loader.hide()
      )
  }

  obterTodos(): void {
    this.playlistService.obterTodos()
      .subscribe(
        playlists => this.playlists = playlists,
        error => this.errorMessage,
        () => this.loader.hide()
      );
  }

  limparFiltro(): void {
    this.playlistFiltro.reset();
    this.obterTodos();
  }
}
