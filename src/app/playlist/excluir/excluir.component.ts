import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { PlaylistService } from '../services/playlist.service';
import { Playlist } from '../models/playlist';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent  {

  playlist: Playlist;

  constructor(
    private playlistService: PlaylistService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {

    this.playlist = this.route.snapshot.data.playlist;
  }

  public excluirPlaylist() {
    this.loader.show();

    this.playlistService.excluirPlaylist(this.playlist.playlistId).subscribe(
      evento => { this.sucessoExclusao(evento); },
      ()     => { this.falha(); }
    );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Playlist excluída com Sucesso!', 'Good bye :D');

    this.loader.hide();

    if (toast) {
      this.router.navigate(['/playlists/listar-todos']);
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
