import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto, LoginResponse, CadastroDto, Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = '/api/Auth';

  constructor(private http: HttpClient) {}

  login(dto: LoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/login`, dto);
  }

  cadastro(dto: CadastroDto): Observable<string> {
    return this.http.post(`${this.api}/cadastro`, dto, { responseType: 'text' });
  }

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.api}/usuarios`);
  }

  excluirUsuario(id: number): Observable<string> {
    return this.http.delete(`${this.api}/usuarios/${id}`, { responseType: 'text' });
  }

  salvarToken(token: string, isAdmin: boolean, nome: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
    localStorage.setItem('nome', nome);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('nome');
  }
}
