import { Injectable } from '@angular/core';

export interface Usuario {
  email: string;
  senha: string;
  endereco: string;
  complemento: string;
  cidade: string;
  estado: string;
  cep: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private storageKey = 'usuarios';

  // Pega todos usuários do localStorage
  private getUsuarios(): Usuario[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Salva todos usuários no localStorage
  private setUsuarios(users: Usuario[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  // Registra o usuário
  register(user: Usuario): boolean {
    const usuarios = this.getUsuarios();
    if (usuarios.find(u => u.email === user.email)) {
      return false;
    }
    usuarios.push(user);
    this.setUsuarios(usuarios);
    return true;
  }

  // Login usuário
  login(email: string, senha: string): Usuario | null {
    const usuarios = this.getUsuarios();
    return usuarios.find(u => u.email === email && u.senha === senha) || null;
  }
}
