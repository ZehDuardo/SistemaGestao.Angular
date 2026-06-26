import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ocupacao, EntradaDto } from '../models/ocupacao.model';

@Injectable({ providedIn: 'root' })
export class OcupacaoService {
  private api = '/api/Ocupacao';

  constructor(private http: HttpClient) {}

  getAtivas(): Observable<Ocupacao[]> {
    return this.http.get<Ocupacao[]>(`${this.api}/ativas`);
  }

  registrarEntrada(dto: EntradaDto): Observable<Ocupacao> {
    return this.http.post<Ocupacao>(`${this.api}/entrada`, dto);
  }

  registrarSaida(numeroVaga: number): Observable<Ocupacao> {
    return this.http.post<Ocupacao>(`${this.api}/saida/${numeroVaga}`, {});
  }

  historico(): Observable<Ocupacao[]> {
    return this.http.get<Ocupacao[]>(`${this.api}/historico`);
  }
}
