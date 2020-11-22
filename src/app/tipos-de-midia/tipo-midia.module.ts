import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { TipoMidiaRoutingModule } from './tipo-midia.route';
import { TipoMidiaAppComponent } from './tipo-midia.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { TipoMidiaService } from './services/tipo-midia.service';
import { TipoMidiaResolve } from './services/tipo-midia.resolve';
import { TipoMidiaGuard } from './services/tipo-midia.guard';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';

@NgModule({
  declarations: [
    TipoMidiaAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    TipoMidiaRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TipoMidiaService,
    TipoMidiaResolve,
    TipoMidiaGuard
  ]
})
export class TipoMidiaModule { }
