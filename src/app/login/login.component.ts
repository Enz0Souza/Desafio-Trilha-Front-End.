import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      senha: [''],
    });
  }

  onSubmit() {
    this.http
      .post('http://localhost:3000/login', this.loginForm.value)
      .subscribe({
        next: (res: any) => {
          alert('Login realizado com sucesso!');
          localStorage.setItem('usuarioLogado', 'true');
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/home']);
        },
        error: (err) => {
          alert('Erro no login: ' + (err.error.message || 'Dados inválidos'));
        },
      });
  }
}
