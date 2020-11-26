import { Funcionario } from 'src/app/funcionario/models/funcionario';

export interface Cliente {
  clienteId: number;
  primeiroNome: string;
  sobrenome: string;
  empresa: string;
  endereco: string;
  cidade: string;
  estado: string;
  pais: string;
  cep: string;
  fone: string;
  fax: string;
  email: string;
  suporte: Funcionario;
}
