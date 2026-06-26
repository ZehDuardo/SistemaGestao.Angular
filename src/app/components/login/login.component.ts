import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = '';
  senha = '';
  mostrarSenha = false;
  msg = '';
  msgOk = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.usuario || !this.senha) {
      this.msg = 'Preencha usuário e senha.';
      this.msgOk = false;
      return;
    }

    this.authService.login({ email: this.usuario, senha: this.senha }).subscribe({
      next: (res) => {
        this.authService.salvarToken(res.token, res.isAdmin, res.nome);
        this.msg = 'Login realizado com sucesso!';
        this.msgOk = true;
        setTimeout(() => this.router.navigate(['/dashboard']), 1000);
      },
      error: () => {
        this.msg = 'Usuário ou senha incorretos.';
        this.msgOk = false;
      }
    });
  }
}
