import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { AuthService } from '../../services/auth';
import { Usuario as UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class Usuario implements OnInit {
  nome = '';
  email = '';
  senha = '';
  msg = '';
  msgOk = false;
  usuarios: UsuarioModel[] = [];

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() { this.carregar(); }

  carregar() {
    this.authService.listarUsuarios().subscribe(u => {
      this.usuarios = u;
      this.cdr.detectChanges();
    });
  }

  criar() {
    if (!this.nome || !this.email || !this.senha) {
      this.msg = 'Preencha todos os campos.';
      this.msgOk = false;
      return;
    }

    this.authService.cadastro({ nome: this.nome, email: this.email, senha: this.senha }).subscribe({
      next: () => {
        this.msg = '✅ Usuário criado com sucesso!';
        this.msgOk = true;
        this.nome = ''; this.email = ''; this.senha = '';
        this.carregar();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.msg = err.error || 'Erro ao criar usuário.';
        this.msgOk = false;
        this.cdr.detectChanges();
      }
    });
  }

  excluir(id: number) {
    if (!confirm('Deseja excluir este usuário?')) return;
    this.authService.excluirUsuario(id).subscribe(() => {
      this.carregar();
    });
  }
}
