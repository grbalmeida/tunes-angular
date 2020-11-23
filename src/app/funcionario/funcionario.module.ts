import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { FuncionarioRoutingModule } from './funcionario.route';
import { FuncionarioAppComponent } from './funcionario.app.component';
import { ListaComponent } from './lista/lista.component';
import { FuncionarioService } from './services/funcionario.service';
import { FuncionarioGuard } from './services/funcionario.guard';
import { NovoComponent } from './novo/novo.component';
import { FuncionarioResolve } from './services/funcionario.resolve';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { EditarComponent } from './editar/editar.component';
import { FuncionariosResolve } from './services/funcionarios.resolve';

@NgModule({
  declarations: [
    FuncionarioAppComponent,
    ListaComponent,
    NovoComponent,
    DetalhesComponent,
    ExcluirComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FuncionarioService,
    FuncionarioGuard,
    FuncionarioResolve,
    FuncionariosResolve
  ]
})
export class FuncionarioModule { }
