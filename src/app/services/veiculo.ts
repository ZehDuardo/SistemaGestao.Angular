import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo, VeiculoDto } from '../models/veiculo.model';

@Injectable({ providedIn: 'root' })
export class VeiculoService {
  private api = '/api/Veiculo';

  constructor(private http: HttpClient) {}

  listar(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.api);
  }

  cadastrar(dto: VeiculoDto): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.api, dto);
  }

  excluir(id: number): Observable<string> {
    return this.http.delete(`${this.api}/${id}`, { responseType: 'text' });
  }
}
