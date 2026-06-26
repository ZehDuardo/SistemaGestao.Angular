import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { OcupacaoService } from '../../services/ocupacao';
import { Ocupacao } from '../../models/ocupacao.model';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './relatorio.html',
  styleUrl: './relatorio.css'
})
export class Relatorio implements OnInit {
  historico: Ocupacao[] = [];
  totalEntradas = 0;
  totalSaidas = 0;
  totalAtivas = 0;

  constructor(
    private ocupacaoService: OcupacaoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() { this.carregar(); }

  carregar() {
    this.ocupacaoService.historico().subscribe(h => {
      this.historico = h;
      this.totalEntradas = h.length;
      this.totalSaidas = h.filter(o => o.dataSaida).length;
      this.totalAtivas = h.filter(o => !o.dataSaida).length;
      this.cdr.detectChanges();
    });
  }

  getPermanencia(ocup: Ocupacao): string {
    const inicio = new Date(ocup.dataEntrada);
    const fim = ocup.dataSaida ? new Date(ocup.dataSaida) : new Date();
    const diffMin = Math.floor((fim.getTime() - inicio.getTime()) / 60000);
    const horas = Math.floor(diffMin / 60);
    const min = diffMin % 60;
    return horas > 0 ? `${horas}h ${min}min` : `${min}min`;
  }

  getIco(ocup: Ocupacao): string {
    return ocup.veiculo?.tipo === 'Moto' ? '🏍️' : '🚗';
  }
}
