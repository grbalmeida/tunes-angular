import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DownloadService } from 'src/app/services/download.service';
import { TipoMidia } from '../models/tipo-midia';
import { TipoMidiaFiltro } from '../models/tipo-midia-filtro';
import { TipoMidiaService } from '../services/tipo-midia.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public tiposDeMidia: TipoMidia[];
  tipoMidiaFiltro: FormGroup;
  errorMessage: string;

  constructor(
    private tipoMidiaService: TipoMidiaService,
    private downloadService: DownloadService,
    private loader: NgxSpinnerService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loader.show();

    this.obterTodos();

    this.tipoMidiaFiltro = this.fb.group({
      nome: ['']
    })
  }

  filtrar(): void {
    const tipoMidiaFiltro = this.tipoMidiaFiltro.value as TipoMidiaFiltro;

    this.tipoMidiaService.filtro(tipoMidiaFiltro)
      .subscribe(
        tiposDeMidia => this.tiposDeMidia = tiposDeMidia,
        error => this.errorMessage,
        () => this.loader.hide()
      )
  }

  obterTodos(): void {
    this.tipoMidiaService.obterTodos()
      .subscribe(
        tiposDeMidia => this.tiposDeMidia = tiposDeMidia,
        error => this.errorMessage,
        () => this.loader.hide()
      );
  }

  excel(): void {
    const tipoMidiaFiltro = this.tipoMidiaFiltro.value as TipoMidiaFiltro;

    this.loader.show();

    this.tipoMidiaService.excel(tipoMidiaFiltro)
      .subscribe(
        excel => this.downloadService.download(excel, 'tipos-de-midia.xlsx'),
        error => this.errorMessage,
        () => this.loader.hide()
      )
  }

  limparFiltro(): void {
    this.tipoMidiaFiltro.reset();
    this.obterTodos();
  }
}
