import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Genero } from 'src/app/genero/models/genero';
import { GeneroService } from 'src/app/genero/services/genero.service';
import { TipoMidia } from 'src/app/tipos-de-midia/models/tipo-midia';
import { TipoMidiaService } from 'src/app/tipos-de-midia/services/tipo-midia.service';
import { Faixa } from '../models/faixa';
import { FaixaFiltro } from '../models/faixa-filtro';
import { FaixaService } from '../services/faixa.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public faixas: Faixa[];
  tiposDeMidia: TipoMidia[] = [];
  generos: Genero[] = [];
  faixaFiltro: FormGroup;
  errorMessage: string;

  constructor(
    private faixaService: FaixaService,
    private tipoDeMidiaService: TipoMidiaService,
    private generoService: GeneroService,
    private loader: NgxSpinnerService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loader.show();

    this.obterTodos();
    this.preencherCombos();

    this.faixaFiltro = this.fb.group({
      nome: [''],
      compositor: [''],
      album: [''],
      tipoDeMidiaId: [''],
      generoId: ['']
    })
  }

  filtrar(): void {
    const faixaFiltro = this.faixaFiltro.value as FaixaFiltro;

    this.faixaService.filtro(faixaFiltro)
      .subscribe(
        faixas => this.faixas = faixas,
        error => this.errorMessage,
        () => this.loader.hide()
      )
  }

  obterTodos(): void {
    this.faixaService.obterTodos()
      .subscribe(
        faixas => this.faixas = faixas,
        error => this.errorMessage,
        () => this.loader.hide()
      );
  }

  preencherCombos(): void {
    this.tipoDeMidiaService.obterTodos()
      .subscribe(
        tiposDeMidia => this.tiposDeMidia = tiposDeMidia,
        error => this.errorMessage,
        () => this.loader.hide()
      )

    this.generoService.obterTodos()
      .subscribe(
        generos => this.generos = generos,
        error => this.errorMessage,
        () => this.loader.hide()
      )
  }

  limparFiltro(): void {
    this.faixaFiltro.reset();
    this.obterTodos();
  }
}
