import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { ClienteRoutingModule } from './cliente.route';
import { ClienteAppComponent } from './cliente.app.component';
import { ListaComponent } from './lista/lista.component';
import { ClienteService } from './services/cliente.service';
import { ClienteGuard } from './services/cliente.guard';
import { NovoComponent } from './novo/novo.component';
import { ClienteResolve } from './services/cliente.resolve';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { FuncionariosResolve } from '../funcionario/services/funcionarios.resolve';
import { ExcluirComponent } from './excluir/excluir.component';
import { FuncionarioService } from '../funcionario/services/funcionario.service';

@NgModule({
  declarations: [
    ClienteAppComponent,
    ListaComponent,
    NovoComponent,
    DetalhesComponent,
    ExcluirComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ClienteService,
    ClienteGuard,
    ClienteResolve,
    FuncionariosResolve,
    FuncionarioService
  ]
})
export class ClienteModule { }
