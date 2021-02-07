import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DownloadService } from 'src/app/services/download.service';
import { Artista } from '../models/artista';
import { ArtistaFiltro } from '../models/artista-filtro';
import { ArtistaService } from '../services/artista.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public artistas: Artista[];
  artistaFiltro: FormGroup;
  errorMessage: string;

  constructor(
    private artistaService: ArtistaService,
    private downloadService: DownloadService,
    private loader: NgxSpinnerService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loader.show();

    this.obterTodos();

    this.artistaFiltro = this.fb.group({
      nome: ['']
    })
  }

  filtrar(): void {
    const artistaFiltro = this.artistaFiltro.value as ArtistaFiltro;

    this.artistaService.filtro(artistaFiltro)
      .subscribe(
        artistas => this.artistas = artistas,
        error => this.errorMessage,
        () => this.loader.hide()
      )
  }

  obterTodos(): void {
    this.artistaService.obterTodos()
      .subscribe(
        artistas => this.artistas = artistas,
        error => this.errorMessage,
        () => this.loader.hide()
      );
  }

  excel(): void {
    const artistaFiltro = this.artistaFiltro.value as ArtistaFiltro;

    this.artistaService.excel(artistaFiltro)
      .subscribe(
        excel => this.downloadService.download(excel, 'artistas.xlsx'),
        error => this.errorMessage,
        () => this.loader.hide()
      )
  }

  limparFiltro(): void {
    this.artistaFiltro.reset();
    this.obterTodos();
  }
}
