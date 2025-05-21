import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      senha: [''],
    });
  }

  onSubmit() {
    const usuario = this.userService.login(
      this.loginForm.value.email,
      this.loginForm.value.senha
    );

    if (!usuario) {
      alert('Email ou senha inválidos');
      return;
    }

    alert('Login realizado com sucesso!');
    localStorage.setItem('usuarioLogado', 'true');
    localStorage.setItem('user', JSON.stringify(usuario));
    this.router.navigate(['/home']);
  }
}
