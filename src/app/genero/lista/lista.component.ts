import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DownloadService } from 'src/app/services/download.service';
import { Genero } from '../models/genero';
import { GeneroFiltro } from '../models/genero-filtro';
import { GeneroService } from '../services/genero.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public generos: Genero[];
  generoFiltro: FormGroup;
  errorMessage: string;

  constructor(
    private generoService: GeneroService,
    private downloadService: DownloadService,
    private loader: NgxSpinnerService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loader.show();

    this.obterTodos();

    this.generoFiltro = this.fb.group({
      nome: ['']
    })
  }

  filtrar(): void {
    const generoFiltro = this.generoFiltro.value as GeneroFiltro;

    this.generoService.filtro(generoFiltro)
      .subscribe(
        generos => this.generos = generos,
        error => this.errorMessage,
        () => this.loader.hide()
      )
  }

  obterTodos(): void {
    this.generoService.obterTodos()
      .subscribe(
        generos => this.generos = generos,
        error => this.errorMessage,
        () => this.loader.hide()
      );
  }

  excel(): void {
    const generoFiltro = this.generoFiltro.value as GeneroFiltro;

    this.generoService.excel(generoFiltro)
      .subscribe(
        excel => this.downloadService.download(excel, 'generos.xlsx'),
        error => this.errorMessage,
        () => this.loader.hide()
      )
  }

  limparFiltro(): void {
    this.generoFiltro.reset();
    this.obterTodos();
  }
}
