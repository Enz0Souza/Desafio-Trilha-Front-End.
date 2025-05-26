import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule,ReactiveFormsModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  erro: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    const { email, senha } = this.loginForm.value;

    if (email.toLowerCase() === 'admin' && senha === '123456') {
      localStorage.setItem(
        'user',
        JSON.stringify({ email: 'admin', senha: '123456', nome: 'Administrador' })
      );
      this.router.navigate(['/dashboard']);
    } else {
      localStorage.setItem('user', JSON.stringify({ email, senha }));
      this.router.navigate(['/home']);
    }
  }
}
