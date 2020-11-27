import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotaFiscalAppComponent } from './nota-fiscal.app.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { NotaFiscalGuard } from './services/nota-fiscal.guard';
import { NotaFiscalResolve } from './services/nota-fiscal.resolve';
import { ClientesResolve } from '../cliente/services/clientes.resolve';
import { FaixasResolve } from '../faixa/services/faixas.resolve';

const notaFiscalRouterConfig: Routes = [
  {
    path: '', component: NotaFiscalAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
      {
        path: 'adicionar-novo',
        component: NovoComponent,
        canDeactivate: [NotaFiscalGuard],
        canActivate: [NotaFiscalGuard],
        data: [
          {
            claim: {
              nome: 'NotaFiscal',
              valor: 'Adicionar'
            }
          }
        ],
        resolve: {
          clientes: ClientesResolve,
          faixas: FaixasResolve
        }
      }
    ]
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canActivate: [NotaFiscalGuard],
    data: [
      {
        claim: {
          nome: 'NotaFiscal',
          valor: 'Atualizar'
        }
      }
    ],
    resolve: {
      notaFiscal: NotaFiscalResolve,
      clientes: ClientesResolve,
      faixas: FaixasResolve
    }
  },
  {
    path: 'detalhes/:id', component: DetalhesComponent,
    resolve: {
      notaFiscal: NotaFiscalResolve
    }
  },
  {
    path: 'excluir/:id', component: ExcluirComponent,
    canActivate: [NotaFiscalGuard],
    data: [
      {
        claim: {
          nome: 'NotaFiscal',
          valor: 'Excluir'
        }
      }
    ],
    resolve: {
      notaFiscal: NotaFiscalResolve
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(notaFiscalRouterConfig)
  ],
  exports: [RouterModule]
})
export class NotaFiscalRoutingModule { }
