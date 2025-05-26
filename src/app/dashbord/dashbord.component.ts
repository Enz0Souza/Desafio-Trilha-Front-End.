import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AgendamentoService, Agendamento, AgendamentosResponse } from '../services/agenda.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  agendamentosDoDia: Agendamento[] = [];
  agendamentosDaSemana: Agendamento[] = [];
  diaSelecionado: string;
  msg: string = '';
  loading: boolean = false;
constructor(
  private agendamentoService: AgendamentoService,
  private cdr: ChangeDetectorRef
) {
  // Formato inicial YYYY-MM-DD
  const today = new Date();
  const offset = today.getTimezoneOffset() * 60000;
  const localDate = new Date(today.getTime() - offset);
  this.diaSelecionado = localDate.toISOString().split('T')[0];

  console.log('Dashboard inicializado com data:', this.diaSelecionado);
  localStorage.setItem('token', 'user-123');
}

  ngOnInit() {
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    this.loading = true;
    this.msg = '';
    console.log('Carregando agendamentos para:', this.diaSelecionado);

    this.agendamentoService.buscarAgendamentos(this.diaSelecionado).subscribe({
      next: (res: AgendamentosResponse) => {
        console.group('Resposta da API');
        console.log('Resposta completa:', res);
        console.log('Debug:', res.debug);
        console.groupEnd();

        this.agendamentosDoDia = res.agendamentosDoDia || [];
        this.agendamentosDaSemana = res.agendamentosDaSemana || [];

        console.log('Dados atribuídos:');
        console.log('Do dia:', this.agendamentosDoDia);
        console.log('Da semana:', this.agendamentosDaSemana);

        this.loading = false;
        this.msg = this.agendamentosDoDia.length === 0 && this.agendamentosDaSemana.length === 0
          ? 'Nenhum agendamento encontrado para esta data'
          : '';

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar agendamentos:', err);
        this.loading = false;
        this.msg = err.status === 401
          ? 'Não autorizado - faça login novamente'
          : err.status === 0
            ? 'Não foi possível conectar ao servidor'
            : 'Erro ao carregar agendamentos';

        this.cdr.detectChanges();
      }
    });
  }

  onDiaChange(event: Event) {
  const input = event.target as HTMLInputElement;
  this.diaSelecionado = input.value;
  console.log('Data alterada para:', this.diaSelecionado);
  this.carregarAgendamentos();
}

 formatarData(data: string): string {
  const dateObj = new Date(data);
  const adjustedDate = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000);
  return adjustedDate.toLocaleDateString('pt-BR');
}
  formatarHora(hora: string): string {
    return hora.slice(0, 5); // Formata HH:MM
  }
}
