import { Component, OnInit } from '@angular/core';
import { TipoMidia } from '../models/tipo-midia';
import { TipoMidiaService } from '../services/tipo-midia.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public tiposDeMidia: TipoMidia[];
  errorMessage: string;

  constructor(private tipoMidiaService: TipoMidiaService) { }

  ngOnInit(): void {
    this.tipoMidiaService.obterTodos()
      .subscribe(
        tiposDeMidia => this.tiposDeMidia = tiposDeMidia,
        error => this.errorMessage
      );
  }
}
