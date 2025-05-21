import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  IsNotificationOpen = false;
  IsUserOpen = false;
  nomeUsuario: string | null = null;
  title: any
  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.nomeUsuario = user.nome || user.email;
    }
  }

  ToggleNotification() {
    this.IsNotificationOpen = !this.IsNotificationOpen;
  }

  ToggleUserCard() {
    this.IsUserOpen = !this.IsUserOpen;
  }

  logout() {
    localStorage.removeItem('user');
    this.nomeUsuario = null;
    location.reload();
  }
}


