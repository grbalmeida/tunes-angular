import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AlbumRoutingModule } from './album.route';
import { AlbumAppComponent } from './album.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { AlbumService } from './services/album.service';
import { AlbumResolve } from './services/album.resolve';
import { AlbumGuard } from './services/album.guard';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ArtistasResolve } from '../artista/services/artistas.resolve';
import { ArtistaService } from '../artista/services/artista.service';

@NgModule({
  declarations: [
    AlbumAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AlbumService,
    ArtistaService,
    AlbumResolve,
    AlbumGuard,
    ArtistasResolve
  ]
})
export class AlbumModule { }
