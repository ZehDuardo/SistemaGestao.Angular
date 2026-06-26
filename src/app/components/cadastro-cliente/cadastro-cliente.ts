import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { ClienteService } from '../../services/cliente';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './cadastro-cliente.html',
  styleUrl: './cadastro-cliente.css'
})
export class CadastroCliente implements OnInit {
  nome = '';
  cpf = '';
  telefone = '';
  email = '';
  msg = '';
  msgOk = false;
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() { this.carregar(); }

  carregar() {
    this.clienteService.listar().subscribe(c => {
      this.clientes = c;
      this.cdr.detectChanges();
    });
  }

  salvar() {
    if (!this.nome) { this.msg = 'Informe o nome.'; this.msgOk = false; return; }
    if (!this.cpf) { this.msg = 'Informe o CPF.'; this.msgOk = false; return; }
    if (!this.telefone) { this.msg = 'Informe o telefone.'; this.msgOk = false; return; }
    if (!this.email) { this.msg = 'Informe o e-mail.'; this.msgOk = false; return; }

    this.clienteService.cadastrar({
      nome: this.nome,
      cpf: this.cpf,
      telefone: this.telefone,
      email: this.email
    }).subscribe({
      next: () => {
        this.msg = '✅ Cliente cadastrado com sucesso!';
        this.msgOk = true;
        this.nome = ''; this.cpf = ''; this.telefone = ''; this.email = '';
        this.carregar();
        this.cdr.detectChanges();
      },
      error: () => {
        this.msg = 'Erro ao cadastrar cliente.';
        this.msgOk = false;
        this.cdr.detectChanges();
      }
    });
  }

  excluir(id: number) {
    if (!confirm('Deseja excluir este cliente?')) return;
    this.clienteService.excluir(id).subscribe(() => {
      this.carregar();
    });
  }
}
