import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { PlaylistRoutingModule } from './playlist.route';
import { PlaylistAppComponent } from './playlist.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { PlaylistService } from './services/playlist.service';
import { PlaylistResolve } from './services/playlist.resolve';
import { PlaylistGuard } from './services/playlist.guard';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';

@NgModule({
  declarations: [
    PlaylistAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    PlaylistRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PlaylistService,
    PlaylistResolve,
    PlaylistGuard
  ]
})
export class PlaylistModule { }
