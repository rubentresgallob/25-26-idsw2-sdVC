import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  soloAdmin?: boolean;
}

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  standalone: false,
})
export class MainLayoutComponent {
  readonly navItems: NavItem[] = [
    { label: 'Grados', icon: 'school', route: '/grados' },
    { label: 'Asignaturas', icon: 'menu_book', route: '/asignaturas' },
    { label: 'Alumnos', icon: 'people', route: '/alumnos' },
    { label: 'Preguntas', icon: 'quiz', route: '/baterias' },
    { label: 'Exámenes', icon: 'assignment', route: '/examenes' },
    {
      label: 'Docentes',
      icon: 'admin_panel_settings',
      route: '/admin/docentes',
      soloAdmin: true,
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  get esAdmin(): boolean {
    return this.authService.esAdmin();
  }

  get itemsVisibles(): NavItem[] {
    return this.navItems.filter((item) => !item.soloAdmin || this.esAdmin);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
