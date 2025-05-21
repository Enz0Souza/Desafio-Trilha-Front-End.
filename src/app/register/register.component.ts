import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
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
      receberPromocoes: [false],
      aceitarTermos: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      alert('Preencha todos os campos obrigatórios e aceite os Termos.');
      return;
    }

    const sucesso = this.userService.register(this.registerForm.value);
    if (!sucesso) {
      alert('Usuário já cadastrado');
      return;
    }

    alert('Usuário registrado com sucesso!');
    this.router.navigate(['/login']);
  }
}
