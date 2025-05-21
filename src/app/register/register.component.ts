import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
      endereco: ['', Validators.required],
      complemento: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      cep: ['', Validators.required],
      receberPromocoes: [false], // opcional
      aceitarTermos: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios e aceite os Termos.');
      return;
    }

    this.http
      .post('http://localhost:3000/register', this.registerForm.value)
      .subscribe({
        next: (res: any) => {
          alert(res.message || 'Usuário registrado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert(
            'Erro ao registrar: ' + (err.error.message || 'Erro desconhecido')
          );
        },
      });
  }
}
