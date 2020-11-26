import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TipoMidia } from '../models/tipo-midia';
import { TipoMidiaService } from '../services/tipo-midia.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public tiposDeMidia: TipoMidia[];
  errorMessage: string;

  constructor(private tipoMidiaService: TipoMidiaService, private loader: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loader.show();

    this.tipoMidiaService.obterTodos()
      .subscribe(
        tiposDeMidia => this.tiposDeMidia = tiposDeMidia,
        error => this.errorMessage,
        () => this.loader.hide()
      );
  }
}
