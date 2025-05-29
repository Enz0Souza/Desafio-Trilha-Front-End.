import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgendamentoService } from '../services/agenda.service';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {
  data = '';
  hora = '';
  servico = '';
  especie = '';
  msg = '';
  loading = false;

  constructor(private agendamentoService: AgendamentoService) {}

agendar() {
  if (!this.data || !this.hora || !this.servico || !this.especie) {
    this.msg = 'Preencha todos os campos!';
    return;
  }

  // Validação da data
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const dataAgendamento = new Date(this.data);
  dataAgendamento.setHours(0, 0, 0, 0);

  if (dataAgendamento < hoje) {
    this.msg = 'Não é possível agendar para datas passadas';
    return;
  }

  this.loading = true;
  this.msg = '';

  const agendamento = {
    data: this.data,
    hora: this.hora,
    especie: this.especie,
    servico: this.servico
  };

  this.agendamentoService.criarAgendamento(agendamento).subscribe({
    next: (res) => {
      this.msg = 'Agendamento feito com sucesso!';
      this.resetForm();
      this.loading = false;
    },
    error: (err) => {
      console.error('Erro ao agendar:', err);
      this.msg = 'Erro ao fazer agendamento. Tente novamente.';
      this.loading = false;
    }
  });
}

  private resetForm() {
    this.data = '';
    this.hora = '';
    this.servico = '';
    this.especie = '';
  }
}
