import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistAppComponent } from './playlist.app.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { PlaylistGuard } from './services/playlist.guard';
import { PlaylistResolve } from './services/playlist.resolve';

const playlistRouterConfig: Routes = [
  {
    path: '', component: PlaylistAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
      {
        path: 'adicionar-novo',
        component: NovoComponent,
        canDeactivate: [PlaylistGuard],
        canActivate: [PlaylistGuard],
        data: [
          {
            claim: {
              nome: 'Playlist',
              valor: 'Adicionar'
            }
          }
        ],
      }
    ]
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canActivate: [PlaylistGuard],
    data: [
      {
        claim: {
          nome: 'Playlist',
          valor: 'Atualizar'
        }
      }
    ],
    resolve: {
      playlist: PlaylistResolve
    }
  },
  {
    path: 'detalhes/:id', component: DetalhesComponent,
    resolve: {
      playlist: PlaylistResolve
    }
  },
  {
    path: 'excluir/:id', component: ExcluirComponent,
    canActivate: [PlaylistGuard],
    data: [
      {
        claim: {
          nome: 'Playlist',
          valor: 'Excluir'
        }
      }
    ],
    resolve: {
      playlist: PlaylistResolve
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(playlistRouterConfig)
  ],
  exports: [RouterModule]
})
export class PlaylistRoutingModule { }
