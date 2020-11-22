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
  {
    path: 'generos',
    loadChildren: () => import('./genero/genero.module').then(m => m.GeneroModule)
  },
  {
    path: 'playlists',
    loadChildren: () => import('./playlist/playlist.module').then(m => m.PlaylistModule)
  },
  {
    path: 'tipos-de-midia',
    loadChildren: () => import('./tipos-de-midia/tipo-midia.module').then(m => m.TipoMidiaModule)
  },
  {
    path: 'albuns',
    loadChildren: () => import('./album/album.module').then(m => m.AlbumModule)
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
