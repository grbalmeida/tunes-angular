import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { PlaylistService } from '../services/playlist.service';
import { Playlist } from '../models/playlist';
import { NgxSpinnerService } from 'ngx-spinner';
import { PLAYLISTS_LISTAR_TODOS } from 'src/app/shared/routes';
import { GOOD_BYE, HOUVE_ERRO_PROCESSAMENTO, OPA, PLAYLIST_EXCLUIDA_SUCESSO } from 'src/app/shared/messages';

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
      error     => { this.falha(error); }
    );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success(PLAYLIST_EXCLUIDA_SUCESSO, GOOD_BYE);

    this.loader.hide();

    if (toast) {
      this.router.navigate([PLAYLISTS_LISTAR_TODOS]);
    }
  }

  public falha(e) {
    this.loader.hide();
    this.toastr.error(e?.error?.errors[0] || HOUVE_ERRO_PROCESSAMENTO, OPA);
  }
}
