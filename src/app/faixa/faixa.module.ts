import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { FaixaRoutingModule } from './faixa.route';
import { FaixaAppComponent } from './faixa.app.component';
import { ListaComponent } from './lista/lista.component';
import { FaixaService } from './services/faixa.service';
import { FaixaGuard } from './services/faixa.guard';
import { TiposDeMidiaResolve } from '../tipos-de-midia/services/tipos-de-midia';
import { AlbunsResolve } from '../album/services/albuns.resolve';
import { GenerosResolve } from '../genero/services/generos.resolve';
import { AlbumService } from '../album/services/album.service';
import { TipoMidiaService } from '../tipos-de-midia/services/tipo-midia.service';
import { GeneroService } from '../genero/services/genero.service';
import { NovoComponent } from './novo/novo.component';
import { FaixaResolve } from './services/faixa.resolve';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { EditarComponent } from './editar/editar.component';

@NgModule({
  declarations: [
    FaixaAppComponent,
    ListaComponent,
    NovoComponent,
    DetalhesComponent,
    ExcluirComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    FaixaRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AlbumService,
    FaixaService,
    TipoMidiaService,
    GeneroService,
    FaixaGuard,
    TiposDeMidiaResolve,
    AlbunsResolve,
    GenerosResolve,
    FaixaResolve
  ]
})
export class FaixaModule { }
