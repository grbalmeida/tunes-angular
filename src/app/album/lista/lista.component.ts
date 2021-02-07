import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DownloadService } from 'src/app/services/download.service';
import { Album } from '../models/album';
import { AlbumFiltro } from '../models/album-filtro';
import { AlbumService } from '../services/album.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public albuns: Album[];
  albumFiltro: FormGroup;
  errorMessage: string;

  constructor(
    private albumService: AlbumService,
    private downloadService: DownloadService,
    private loader: NgxSpinnerService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loader.show();

    this.obterTodos();

    this.albumFiltro = this.fb.group({
      titulo: [''],
      artista: ['']
    })
  }

  filtrar(): void {
    const albumFiltro = this.albumFiltro.value as AlbumFiltro;

    this.albumService.filtro(albumFiltro)
      .subscribe(
        albuns => this.albuns = albuns,
        error => this.errorMessage,
        () => this.loader.hide()
      )
  }

  obterTodos(): void {
    this.albumService.obterTodos()
      .subscribe(
        albuns => this.albuns = albuns,
        error => this.errorMessage,
        () => this.loader.hide()
      );
  }

  excel(): void {
    const albumFiltro = this.albumFiltro.value as AlbumFiltro;

    this.loader.show();

    this.albumService.excel(albumFiltro)
      .subscribe(
        excel => this.downloadService.download(excel, 'albuns.xlsx'),
        error => this.errorMessage,
        () => this.loader.hide()
      )
  }

  limparFiltro(): void {
    this.albumFiltro.reset();
    this.obterTodos();
  }
}
