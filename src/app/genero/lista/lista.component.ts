import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Genero } from '../models/genero';
import { GeneroService } from '../services/genero.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public generos: Genero[];
  errorMessage: string;

  constructor(private generoService: GeneroService, private loader: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loader.show();

    this.generoService.obterTodos()
      .subscribe(
        generos => this.generos = generos,
        error => this.errorMessage,
        () => this.loader.hide()
      );
  }
}
