import { Album } from 'src/app/album/models/album';
import { Genero } from 'src/app/genero/models/genero';
import { TipoMidia } from 'src/app/tipos-de-midia/models/tipo-midia';

export interface Faixa {
  faixaId: number;
  nome: string;
  compositor: string;
  milissegundos: number;
  bytes: number;
  precoUnitario: number;
  album?: Album;
  tipoMidia: TipoMidia;
  genero?: Genero;
}
