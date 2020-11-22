import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbunsResolve } from '../album/services/albuns.resolve';
import { GenerosResolve } from '../genero/services/generos.resolve';
import { TiposDeMidiaResolve } from '../tipos-de-midia/services/tipos-de-midia';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { FaixaAppComponent } from './faixa.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { FaixaGuard } from './services/faixa.guard';
import { FaixaResolve } from './services/faixa.resolve';

const albumRouterConfig: Routes = [
  {
    path: '', component: FaixaAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
      {
        path: 'adicionar-novo',
        component: NovoComponent,
        canDeactivate: [FaixaGuard],
        canActivate: [FaixaGuard],
        data: [
          {
            claim: {
              nome: 'Faixa',
              valor: 'Adicionar'
            }
          }
        ],
        resolve: {
          albuns: AlbunsResolve,
          tiposDeMidia: TiposDeMidiaResolve,
          generos: GenerosResolve
        }
      }
    ]
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canActivate: [FaixaGuard],
    data: [
      {
        claim: {
          nome: 'Faixa',
          valor: 'Atualizar'
        }
      }
    ],
    resolve: {
      faixa: FaixaResolve,
      albuns: AlbunsResolve,
      tiposDeMidia: TiposDeMidiaResolve,
      generos: GenerosResolve
    }
  },
  {
    path: 'detalhes/:id', component: DetalhesComponent,
    resolve: {
      faixa: FaixaResolve
    }
  },
  {
    path: 'excluir/:id', component: ExcluirComponent,
    canActivate: [FaixaGuard],
    data: [
      {
        claim: {
          nome: 'Faixa',
          valor: 'Excluir'
        }
      }
    ],
    resolve: {
      faixa: FaixaResolve
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(albumRouterConfig)
  ],
  exports: [RouterModule]
})
export class FaixaRoutingModule { }
