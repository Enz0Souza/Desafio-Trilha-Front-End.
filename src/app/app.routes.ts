import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AgendaComponent } from './agenda/agenda.component';
import { LoginComponent } from './login/login.component';
import { ContatoComponent } from './contato/contato.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { TermosCondicoesComponent } from './termos-condicoes/termos-condicoes.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'agendamento',
    component: AgendaComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'contato',
    component: ContatoComponent,
  },
  {
    path: 'privacidade',
    component: CopyrightComponent,
  },

  { path: 'register', component: RegisterComponent },

  { path: 'termos-condições', component: TermosCondicoesComponent },
];
