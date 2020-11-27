import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotaFiscal } from '../models/nota-fiscal';
import { NotaFiscalService } from '../services/nota-fiscal.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public notasFiscais: NotaFiscal[];
  errorMessage: string;

  constructor(private notaFiscalService: NotaFiscalService, private loader: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loader.show();

    this.notaFiscalService.obterTodos()
      .subscribe(
        notasFiscais => this.notasFiscais = notasFiscais,
        error => this.errorMessage,
        () => this.loader.hide()
      );
  }
}
