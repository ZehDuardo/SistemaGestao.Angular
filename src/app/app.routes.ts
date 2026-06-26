import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { Dashboard } from './components/dashboard/dashboard';
import { CadastroVeiculo } from './components/cadastro-veiculo/cadastro-veiculo';
import { CadastroCliente } from './components/cadastro-cliente/cadastro-cliente';
import { Relatorio } from './components/relatorio/relatorio';
import { Usuario } from './components/usuario/usuario';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'cadastro-veiculo', component: CadastroVeiculo, canActivate: [authGuard] },
  { path: 'cadastro-cliente', component: CadastroCliente, canActivate: [authGuard] },
  { path: 'relatorio', component: Relatorio, canActivate: [authGuard] },
  { path: 'usuario', component: Usuario, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
