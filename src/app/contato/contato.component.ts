import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective],
  providers: [
      provideNgxMask()
    ],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css',
})
export class ContatoComponent {
  enviarFormulario() {
    alert('Mensagem enviada com sucesso!');
  }
}
