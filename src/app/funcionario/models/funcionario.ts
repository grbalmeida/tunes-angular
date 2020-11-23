export interface Funcionario {
  funcionarioId: number;
  primeiroNome: string;
  sobrenome: string;
  titulo: string;
  dataNascimento: Date;
  dataAdmissao: Date;
  endereco: string;
  cidade: string;
  estado: string;
  pais: string;
  cep: string;
  fone: string;
  fax: string;
  email: string;
  gerente: Funcionario;
  equipe: Funcionario[];
}
