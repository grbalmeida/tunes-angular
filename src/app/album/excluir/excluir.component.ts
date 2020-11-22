import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';
import { NgxSpinnerService } from 'ngx-spinner';
import { ALBUNS_LISTAR_TODOS } from 'src/app/shared/routes';
import { ALBUM_EXCLUIDO_SUCESSO, GOOD_BYE, HOUVE_ERRO_PROCESSAMENTO, OPA } from 'src/app/shared/messages';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent  {

  album: Album;

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {

    this.album = this.route.snapshot.data.album;
  }

  public excluirAlbum() {
    this.loader.show();

    this.albumService.excluirAlbum(this.album.albumId).subscribe(
      evento => { this.sucessoExclusao(evento); },
      error     => { this.falha(error); }
    );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success(ALBUM_EXCLUIDO_SUCESSO, GOOD_BYE);

    this.loader.hide();

    if (toast) {
      this.router.navigate([ALBUNS_LISTAR_TODOS]);
    }
  }

  public falha(e) {
    this.loader.hide();
    this.toastr.error(e?.error?.errors[0] || HOUVE_ERRO_PROCESSAMENTO, OPA);
  }
}
