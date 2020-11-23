import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { FuncionarioAppComponent } from './funcionario.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { FuncionarioGuard } from './services/funcionario.guard';
import { FuncionarioResolve } from './services/funcionario.resolve';
import { FuncionariosResolve } from './services/funcionarios.resolve';

const funcionarioRouterConfig: Routes = [
  {
    path: '', component: FuncionarioAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
      {
        path: 'adicionar-novo',
        component: NovoComponent,
        canDeactivate: [FuncionarioGuard],
        canActivate: [FuncionarioGuard],
        data: [
          {
            claim: {
              nome: 'Funcionario',
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
    canActivate: [FuncionarioGuard],
    data: [
      {
        claim: {
          nome: 'Funcionario',
          valor: 'Atualizar'
        }
      }
    ],
    resolve: {
      funcionario: FuncionarioResolve,
      funcionarios: FuncionariosResolve
    }
  },
  {
    path: 'detalhes/:id', component: DetalhesComponent,
    resolve: {
      funcionario: FuncionarioResolve
    }
  },
  {
    path: 'excluir/:id', component: ExcluirComponent,
    canActivate: [FuncionarioGuard],
    data: [
      {
        claim: {
          nome: 'Funcionario',
          valor: 'Excluir'
        }
      }
    ],
    resolve: {
      funcionario: FuncionarioResolve
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(funcionarioRouterConfig)
  ],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
