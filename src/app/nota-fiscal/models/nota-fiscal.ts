import { Cliente } from 'src/app/cliente/models/cliente';
import { ItemNotaFiscal } from './item-nota-fiscal';

export interface NotaFiscal {
  notaFiscalId: number;
  dataNotaFiscal: Date;
  endereco: string;
  cidade: string;
  estado: string;
  pais: string;
  cep: string;
  total: number;
  cliente: Cliente;
  itensNotaFiscal: ItemNotaFiscal[];
}
