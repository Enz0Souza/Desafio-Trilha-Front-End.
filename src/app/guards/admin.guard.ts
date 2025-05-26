import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}
canActivate(): boolean {
  const userStr = localStorage.getItem('user');

  if (userStr) {
    const user = JSON.parse(userStr);

    if (user.email?.toLowerCase() === 'admin' && user.senha === '123456') {
      return true;
    } else {
      console.log('Usuário não é admin ou senha incorreta');
    }
  } else {
    console.log('Nenhum usuário no localStorage');
  }

  this.router.navigate(['/home']);
  return false;
}
}
