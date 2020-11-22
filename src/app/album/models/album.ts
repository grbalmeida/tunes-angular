import { Artista } from 'src/app/artista/models/artista';

export interface Album {
  albumId: number;
  titulo: string;
  artista: Artista;
  artistaId: number;
}
