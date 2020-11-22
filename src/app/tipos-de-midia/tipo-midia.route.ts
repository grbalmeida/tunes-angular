import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoMidiaAppComponent } from './tipo-midia.app.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { TipoMidiaGuard } from './services/tipo-midia.guard';
import { TipoMidiaResolve } from './services/tipo-midia.resolve';

const tipoMidiaRouterConfig: Routes = [
  {
    path: '', component: TipoMidiaAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
      {
        path: 'adicionar-novo',
        component: NovoComponent,
        canDeactivate: [TipoMidiaGuard],
        canActivate: [TipoMidiaGuard],
        data: [
          {
            claim: {
              nome: 'TipoMidia',
              valor: 'Adicionar'
            }
          }
        ],
      }
    ]
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canActivate: [TipoMidiaGuard],
    data: [
      {
        claim: {
          nome: 'TipoMidia',
          valor: 'Atualizar'
        }
      }
    ],
    resolve: {
      tipoMidia: TipoMidiaResolve
    }
  },
  {
    path: 'detalhes/:id', component: DetalhesComponent,
    resolve: {
      tipoMidia: TipoMidiaResolve
    }
  },
  {
    path: 'excluir/:id', component: ExcluirComponent,
    canActivate: [TipoMidiaGuard],
    data: [
      {
        claim: {
          nome: 'TipoMidia',
          valor: 'Excluir'
        }
      }
    ],
    resolve: {
      tipoMidia: TipoMidiaResolve
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(tipoMidiaRouterConfig)
  ],
  exports: [RouterModule]
})
export class TipoMidiaRoutingModule { }
