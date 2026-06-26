import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { VeiculoService } from '../../services/veiculo';
import { Veiculo } from '../../models/veiculo.model';

@Component({
  selector: 'app-cadastro-veiculo',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './cadastro-veiculo.html',
  styleUrl: './cadastro-veiculo.css'
})
export class CadastroVeiculo implements OnInit {
  tipo = '';
  placa = '';
  modelo = '';
  cor = '';
  msg = '';
  msgOk = false;
  veiculos: Veiculo[] = [];

  constructor(
    private veiculoService: VeiculoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() { this.carregar(); }

  carregar() {
    this.veiculoService.listar().subscribe(v => {
      this.veiculos = v;
      this.cdr.detectChanges();
    });
  }

  selecionarTipo(t: string) {
    this.tipo = t;
    this.cdr.detectChanges();
  }

  salvar() {
    if (!this.tipo) { this.msg = 'Selecione o tipo.'; this.msgOk = false; return; }
    if (!this.placa) { this.msg = 'Informe a placa.'; this.msgOk = false; return; }
    if (!this.modelo) { this.msg = 'Informe o modelo.'; this.msgOk = false; return; }
    if (!this.cor) { this.msg = 'Informe a cor.'; this.msgOk = false; return; }

    this.veiculoService.cadastrar({
      tipo: this.tipo,
      placa: this.placa,
      modelo: this.modelo,
      cor: this.cor
    }).subscribe({
      next: () => {
        this.msg = '✅ Veículo cadastrado com sucesso!';
        this.msgOk = true;
        this.tipo = ''; this.placa = ''; this.modelo = ''; this.cor = '';
        this.carregar();
        this.cdr.detectChanges();
      },
      error: () => {
        this.msg = 'Erro ao cadastrar veículo.';
        this.msgOk = false;
        this.cdr.detectChanges();
      }
    });
  }

  excluir(id: number) {
    if (!confirm('Deseja excluir este veículo?')) return;
    this.veiculoService.excluir(id).subscribe(() => {
      this.carregar();
    });
  }
}
