import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';

export interface Agendamento {
  id?: number;
  data: string;
  hora: string;
  especie: string;
  userId?: string;
  criadoEm?: string;
}

export interface AgendamentosResponse {
  dia: string;
  agendamentosDoDia: Agendamento[];
  agendamentosDaSemana: Agendamento[];
  debug?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = 'http://localhost:3000/api/agendamentos';

  constructor(private http: HttpClient) {
    console.log('Serviço de agendamento inicializado');
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token') || 'user-123';

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  criarAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    console.log('Criando agendamento:', agendamento);
    return this.http.post<Agendamento>(this.apiUrl, agendamento, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(res => console.log('Agendamento criado com sucesso:', res)),
      catchError(err => {
        console.error('Erro ao criar agendamento:', err);
        throw err;
      })
    );
  }

  buscarAgendamentos(dia: string): Observable<AgendamentosResponse> {
    console.log('Buscando agendamentos para:', dia);
    const headers = this.getAuthHeaders();

    return this.http.get<AgendamentosResponse>(`${this.apiUrl}?dia=${dia}`, { headers }).pipe(
      tap(res => console.log('Resposta da API:', res)),
      catchError(err => {
        console.error('Erro ao buscar agendamentos:', err);
        throw err;
      })
    );
}
}