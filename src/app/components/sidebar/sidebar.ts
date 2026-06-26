import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isAdmin = this.authService.isAdmin();
  }

  sair() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
