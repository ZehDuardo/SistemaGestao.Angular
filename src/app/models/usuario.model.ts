export interface Usuario {
  id: number;
  nome: string;
  email: string;
  isAdmin: boolean;
}

export interface LoginDto {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  isAdmin: boolean;
  nome: string;
}

export interface CadastroDto {
  nome: string;
  email: string;
  senha: string;
}
