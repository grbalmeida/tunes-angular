import { Faixa } from 'src/app/faixa/models/faixa';
import { NotaFiscal } from './nota-fiscal';

export interface ItemNotaFiscal {
  itemNotaFiscalId: number;
  precoUnitario: number;
  quantidade: number;
  notaFiscal: NotaFiscal;
  faixa: Faixa;
}
