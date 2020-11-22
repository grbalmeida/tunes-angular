import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';
import { NgxSpinnerService } from 'ngx-spinner';

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
      ()     => { this.falha(); }
    );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Álbum excluído com Sucesso!', 'Good bye :D');

    this.loader.hide();

    if (toast) {
      this.router.navigate(['/albuns/listar-todos']);
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
