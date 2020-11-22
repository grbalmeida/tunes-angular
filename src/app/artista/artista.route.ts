import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistaAppComponent } from './artista.app.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { ArtistaGuard } from './services/artista.guard';
import { ArtistaResolve } from './services/artista.resolve';

const artistaRouterConfig: Routes = [
  {
    path: '', component: ArtistaAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
      {
        path: 'adicionar-novo',
        component: NovoComponent,
        canDeactivate: [ArtistaGuard],
        canActivate: [ArtistaGuard],
        data: [
          {
            claim: {
              nome: 'Artista',
              valor: 'Adicionar'
            }
          }
        ],
      }
    ]
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canActivate: [ArtistaGuard],
    data: [
      {
        claim: {
          nome: 'Artista',
          valor: 'Atualizar'
        }
      }
    ],
    resolve: {
      artista: ArtistaResolve
    }
  },
  {
    path: 'detalhes/:id', component: DetalhesComponent,
    resolve: {
      artista: ArtistaResolve
    }
  },
  {
    path: 'excluir/:id', component: ExcluirComponent,
    canActivate: [ArtistaGuard],
    data: [
      {
        claim: {
          nome: 'Artista',
          valor: 'Excluir'
        }
      }
    ],
    resolve: {
      artista: ArtistaResolve
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(artistaRouterConfig)
  ],
  exports: [RouterModule]
})
export class ArtistaRoutingModule { }
