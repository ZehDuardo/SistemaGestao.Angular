export interface Veiculo {
  id: number;
  tipo: string;
  placa: string;
  modelo: string;
  cor: string;
  dataCadastro?: string;
}

export interface VeiculoDto {
  tipo: string;
  placa: string;
  modelo: string;
  cor: string;
}
