import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionariosResolve } from '../funcionario/services/funcionarios.resolve';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ClienteAppComponent } from './cliente.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { ClienteGuard } from './services/cliente.guard';
import { ClienteResolve } from './services/cliente.resolve';

const clienteRouterConfig: Routes = [
  {
    path: '', component: ClienteAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
      {
        path: 'adicionar-novo',
        component: NovoComponent,
        canDeactivate: [ClienteGuard],
        canActivate: [ClienteGuard],
        data: [
          {
            claim: {
              nome: 'Cliente',
              valor: 'Adicionar'
            }
          }
        ],
        resolve: {
          funcionarios: FuncionariosResolve
        }
      }
    ]
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canActivate: [ClienteGuard],
    data: [
      {
        claim: {
          nome: 'Cliente',
          valor: 'Atualizar'
        }
      }
    ],
    resolve: {
      cliente: ClienteResolve,
      funcionarios: FuncionariosResolve
    }
  },
  {
    path: 'detalhes/:id', component: DetalhesComponent,
    resolve: {
      cliente: ClienteResolve
    }
  },
  {
    path: 'excluir/:id', component: ExcluirComponent,
    canActivate: [ClienteGuard],
    data: [
      {
        claim: {
          nome: 'Cliente',
          valor: 'Excluir'
        }
      }
    ],
    resolve: {
      cliente: ClienteResolve
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(clienteRouterConfig)
  ],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
