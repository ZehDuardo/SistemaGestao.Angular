import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, ClienteDto } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private api = '/api/Cliente';

  constructor(private http: HttpClient) {}

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.api);
  }

  cadastrar(dto: ClienteDto): Observable<Cliente> {
    return this.http.post<Cliente>(this.api, dto);
  }

  excluir(id: number): Observable<string> {
    return this.http.delete(`${this.api}/${id}`, { responseType: 'text' });
  }
}
