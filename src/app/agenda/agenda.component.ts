import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Agendamento {
  data: string;
  hora: string;
  servico: string;
}

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  agendamentos: Agendamento[] = [];
  data: string = '';
  hora: string = '';
  servico: string = '';
  erroMsg: string = '';

  ngOnInit() {
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    const agendamentosSalvos = localStorage.getItem('agendamentos');
    if (agendamentosSalvos) {
      this.agendamentos = JSON.parse(agendamentosSalvos);
    }
  }

  salvarAgendamentos() {
    localStorage.setItem('agendamentos', JSON.stringify(this.agendamentos));
  }

  agendar() {
    this.erroMsg = '';

    if (!this.data || !this.hora) {
      this.erroMsg = 'Por favor, preencha data e hora.';
      return;
    }

    const existe = this.agendamentos.some(
      ag => ag.data === this.data && ag.hora === this.hora
    );
    if (existe) {
      this.erroMsg = 'Esse horário já foi agendado!';
      return;
    }

    this.agendamentos.push({
      data: this.data,
      hora: this.hora,
      servico: this.servico
    });

    this.salvarAgendamentos();

    this.data = '';
    this.hora = '';
    this.servico = '';
  }
}
