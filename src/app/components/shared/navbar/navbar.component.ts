import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="container nav-container">
        <a routerLink="/" class="logo">Portfolio</a>

        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/about" routerLinkActive="active">About</a>
          <a routerLink="/projects" routerLinkActive="active">Projects</a>
          <a routerLink="/contact" routerLinkActive="active">Contact</a>

          <button class="theme-toggle" (click)="themeService.toggleTheme()">
            <span>
              {{themeService.isDarkMode() ? 'light_mode' : 'dark_mode'}}
            </span>
          </button>
        </div>
      </div>
    </nav>
  `,
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  themeService = inject(ThemeService);

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const navbar = document.querySelector('.navbar') as HTMLElement;

      if (navbar) {
        window.addEventListener('scroll', () => {
          // Si el tema oscuro está activado, no cambiar la opacidad
          if (this.themeService.isDarkMode()) {
            navbar.style.backgroundColor = 'var(--navbar-background)';
            return;
          }
          const scrollPosition = window.scrollY;
          const maxScroll = 300;
          const opacity = Math.min(scrollPosition / maxScroll, 1);
          navbar.style.backgroundColor = `rgba(255, 255, 255, ${0.2 + 0.8 * opacity})`;
        });
      }
    }
  }
}
