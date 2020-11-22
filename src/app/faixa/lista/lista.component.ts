import { Component, OnInit } from '@angular/core';
import { Faixa } from '../models/faixa';
import { FaixaService } from '../services/faixa.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public faixas: Faixa[];
  errorMessage: string;

  constructor(private faixaService: FaixaService) { }

  ngOnInit(): void {
    this.faixaService.obterTodos()
      .subscribe(
        faixas => this.faixas = faixas,
        error => this.errorMessage
      );
  }
}
