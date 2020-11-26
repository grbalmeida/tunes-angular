import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Artista } from '../models/artista';
import { ArtistaService } from '../services/artista.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public artistas: Artista[];
  errorMessage: string;

  constructor(private artistaService: ArtistaService, private loader: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loader.show();

    this.artistaService.obterTodos()
      .subscribe(
        artistas => this.artistas = artistas,
        error => this.errorMessage,
        () => this.loader.hide()
      );
  }
}
