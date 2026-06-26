import { Veiculo } from './veiculo.model';
import { Cliente } from './cliente.model';

export interface Ocupacao {
  id: number;
  numeroVaga: number;
  veiculoId: number;
  clienteId: number;
  dataEntrada: string;
  dataSaida?: string;
  veiculo?: Veiculo;
  cliente?: Cliente;
}

export interface EntradaDto {
  numeroVaga: number;
  veiculoId: number;
  clienteId: number;
}
