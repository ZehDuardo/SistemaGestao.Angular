export interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
}

export interface ClienteDto {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
}
