import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistasResolve } from '../artista/services/artistas.resolve';
import { AlbumAppComponent } from './album.app.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { AlbumGuard } from './services/album.guard';
import { AlbumResolve } from './services/album.resolve';

const albumRouterConfig: Routes = [
  {
    path: '', component: AlbumAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
      {
        path: 'adicionar-novo',
        component: NovoComponent,
        canDeactivate: [AlbumGuard],
        canActivate: [AlbumGuard],
        data: [
          {
            claim: {
              nome: 'Album',
              valor: 'Adicionar'
            }
          }
        ],
        resolve: {
          artistas: ArtistasResolve
        }
      }
    ]
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canActivate: [AlbumGuard],
    data: [
      {
        claim: {
          nome: 'Album',
          valor: 'Atualizar'
        }
      }
    ],
    resolve: {
      album: AlbumResolve,
      artistas: ArtistasResolve
    }
  },
  {
    path: 'detalhes/:id', component: DetalhesComponent,
    resolve: {
      album: AlbumResolve
    }
  },
  {
    path: 'excluir/:id', component: ExcluirComponent,
    canActivate: [AlbumGuard],
    data: [
      {
        claim: {
          nome: 'Album',
          valor: 'Excluir'
        }
      }
    ],
    resolve: {
      album: AlbumResolve
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(albumRouterConfig)
  ],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
