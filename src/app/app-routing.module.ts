import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './navegacao/home/home.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';
import { AcessoNegadoComponent } from './navegacao/acesso-negado/acesso-negado.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'conta',
    loadChildren: () => import('./conta/conta.module').then(m => m.ContaModule)
  },
  {
    path: 'artistas',
    loadChildren: () => import('./artista/artista.module').then(m => m.ArtistaModule)
  },

  { path: 'nao-encontrado', component: NotFoundComponent },
  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
