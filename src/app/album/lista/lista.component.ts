import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { AlbumService } from '../services/album.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public albuns: Album[];
  errorMessage: string;

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.albumService.obterTodos()
      .subscribe(
        albuns => this.albuns = albuns,
        error => this.errorMessage
      );
  }
}
