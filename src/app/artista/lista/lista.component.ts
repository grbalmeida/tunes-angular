import { Component, OnInit } from '@angular/core';
import { Artista } from '../models/artista';
import { ArtistaService } from '../services/artista.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public artistas: Artista[];
  errorMessage: string;

  constructor(private artistaService: ArtistaService) { }

  ngOnInit(): void {
    this.artistaService.obterTodos()
      .subscribe(
        artistas => this.artistas = artistas,
        error => this.errorMessage
      );
  }
}
