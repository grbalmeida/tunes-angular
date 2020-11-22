import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneroAppComponent } from './genero.app.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { GeneroGuard } from './services/genero.guard';
import { GeneroResolve } from './services/genero.resolve';

const generoRouterConfig: Routes = [
  {
    path: '', component: GeneroAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
      {
        path: 'adicionar-novo',
        component: NovoComponent,
        canDeactivate: [GeneroGuard],
        canActivate: [GeneroGuard],
        data: [
          {
            claim: {
              nome: 'Genero',
              valor: 'Adicionar'
            }
          }
        ],
      }
    ]
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canActivate: [GeneroGuard],
    data: [
      {
        claim: {
          nome: 'Genero',
          valor: 'Atualizar'
        }
      }
    ],
    resolve: {
      genero: GeneroResolve
    }
  },
  {
    path: 'detalhes/:id', component: DetalhesComponent,
    resolve: {
      genero: GeneroResolve
    }
  },
  {
    path: 'excluir/:id', component: ExcluirComponent,
    canActivate: [GeneroGuard],
    data: [
      {
        claim: {
          nome: 'Genero',
          valor: 'Excluir'
        }
      }
    ],
    resolve: {
      genero: GeneroResolve
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(generoRouterConfig)
  ],
  exports: [RouterModule]
})
export class GeneroRoutingModule { }
