import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { NotaFiscalRoutingModule } from './nota-fiscal.route';
import { NotaFiscalAppComponent } from './nota-fiscal.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { NotaFiscalService } from './services/nota-fiscal.service';
import { NotaFiscalResolve } from './services/nota-fiscal.resolve';
import { NotaFiscalGuard } from './services/nota-fiscal.guard';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ClientesResolve } from '../cliente/services/clientes.resolve';
import { ClienteService } from '../cliente/services/cliente.service';
import { FaixasResolve } from '../faixa/services/faixas.resolve';
import { FaixaService } from '../faixa/services/faixa.service';

@NgModule({
  declarations: [
    NotaFiscalAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    NotaFiscalRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    NotaFiscalService,
    NotaFiscalResolve,
    NotaFiscalGuard,
    ClientesResolve,
    ClienteService,
    FaixasResolve,
    FaixaService
  ]
})
export class NotaFiscalModule { }
