import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css',
})
export class ContatoComponent {
  enviarFormulario() {
    alert('Mensagem enviada com sucesso!');
  }
}
