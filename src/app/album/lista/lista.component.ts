import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Album } from '../models/album';
import { AlbumService } from '../services/album.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public albuns: Album[];
  errorMessage: string;

  constructor(private albumService: AlbumService, private loader: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loader.show();

    this.albumService.obterTodos()
      .subscribe(
        albuns => this.albuns = albuns,
        error => this.errorMessage,
        () => this.loader.hide()
      );
  }
}
