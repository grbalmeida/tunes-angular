import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { ArtistaRoutingModule } from './artista.route';
import { ArtistaAppComponent } from './artista.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { ArtistaService } from './services/artista.service';
import { ArtistaResolve } from './services/artista.resolve';
import { ArtistaGuard } from './services/artista.guard';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';

@NgModule({
  declarations: [
    ArtistaAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    ArtistaRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ArtistaService,
    ArtistaResolve,
    ArtistaGuard
  ]
})
export class ArtistaModule { }
