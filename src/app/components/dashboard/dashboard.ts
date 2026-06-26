import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { OcupacaoService } from '../../services/ocupacao';
import { VeiculoService } from '../../services/veiculo';
import { ClienteService } from '../../services/cliente';
import { Ocupacao } from '../../models/ocupacao.model';
import { Veiculo } from '../../models/veiculo.model';
import { Cliente } from '../../models/cliente.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  vagas = Array.from({ length: 18 }, (_, i) => i + 1);
  ocupacoes: Ocupacao[] = [];
  veiculos: Veiculo[] = [];
  clientes: Cliente[] = [];

  modalAberto = false;
  vagaSelecionada = 0;
  ocupacaoSelecionada: Ocupacao | null = null;
  veiculoId = 0;
  clienteId = 0;

  constructor(
    private ocupacaoService: OcupacaoService,
    private veiculoService: VeiculoService,
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() { this.carregarDados(); }

  carregarDados() {
    forkJoin({
      ocupacoes: this.ocupacaoService.getAtivas(),
      veiculos: this.veiculoService.listar(),
      clientes: this.clienteService.listar()
    }).subscribe(({ ocupacoes, veiculos, clientes }) => {
      this.ocupacoes = ocupacoes;
      this.veiculos = veiculos;
      this.clientes = clientes;
      this.cdr.detectChanges();
    });
  }

  getOcupacao(vaga: number): Ocupacao | undefined {
    return this.ocupacoes.find(o => o.numeroVaga === vaga);
  }

  getIco(vaga: number): string {
    const ocup = this.getOcupacao(vaga);
    if (!ocup) return '';
    return ocup.veiculo?.tipo === 'Moto' ? '🏍️' : '🚗';
  }

  abrirModal(vaga: number) {
    this.vagaSelecionada = vaga;
    this.ocupacaoSelecionada = this.getOcupacao(vaga) || null;
    this.veiculoId = 0;
    this.clienteId = 0;
    this.modalAberto = true;
    this.cdr.detectChanges();
  }

  fecharModal() {
    this.modalAberto = false;
    this.cdr.detectChanges();
  }

  registrarEntrada() {
    if (!this.veiculoId || !this.clienteId) {
      alert('Selecione o veículo e o cliente!');
      return;
    }
    this.ocupacaoService.registrarEntrada({
      numeroVaga: this.vagaSelecionada,
      veiculoId: Number(this.veiculoId),
      clienteId: Number(this.clienteId)
    }).subscribe(() => {
      this.fecharModal();
      this.carregarDados();
    });
  }

  registrarSaida() {
    this.ocupacaoService.registrarSaida(this.vagaSelecionada).subscribe(() => {
      this.fecharModal();
      this.carregarDados();
    });
  }
}
