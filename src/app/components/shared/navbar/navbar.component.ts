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
        <a routerLink="/" class="logo">
          <img src="../../../../assets/img/mari.png" alt="">
        </a>

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
      const navLinks = document.querySelectorAll('.nav-links a');
      const themeToggle = document.querySelector('.theme-toggle') as HTMLElement;

      // Establecer el color inicial del texto a blanco
      navLinks.forEach((link) => {
        (link as HTMLElement).style.color = 'white';
      });

      // Establecer el color inicial del botón theme-toggle a blanco
      if (themeToggle) {
        themeToggle.style.color = 'white';
      }

      if (navbar) {
        window.addEventListener('scroll', () => {
          const scrollPosition = window.scrollY;
          const maxScroll = 300;
          const opacity = Math.min(scrollPosition / maxScroll, 1);

          // Si el tema oscuro está activado, no cambiar la opacidad
          if (this.themeService.isDarkMode()) {
            navbar.style.backgroundColor = 'var(--navbar-background)';
            return;
          }

          navbar.style.backgroundColor = `rgba(255, 255, 255, ${0.2 + 0.8 * opacity})`;

          // Si el usuario se ha desplazado más de 50px, restablecer el color del texto al color predeterminado
          if (scrollPosition > 50) {
            navLinks.forEach((link) => {
              (link as HTMLElement).style.color = 'var(--text-color)';
            });
            if (themeToggle) {
              themeToggle.style.color = 'var(--text-color)';
            }
          } else {
            // Si el usuario está en la parte superior de la página, mantener el color del texto blanco
            navLinks.forEach((link) => {
              (link as HTMLElement).style.color = 'white';
            });
            if (themeToggle) {
              themeToggle.style.color = 'white';
            }
          }
        });

        // Agregar evento mouseover al botón theme-toggle
        if (themeToggle) {
          themeToggle.addEventListener('mouseover', () => {
            if (themeToggle.style.color === 'white') {
              themeToggle.style.color = 'black';
            }
          });

          themeToggle.addEventListener('mouseout', () => {
            if (window.scrollY <= 50) {
              themeToggle.style.color = 'white';
            } else {
              themeToggle.style.color = 'var(--text-color)';
            }
          });
        }
      }
    }
  }
}
