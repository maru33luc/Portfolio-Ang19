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
            <span class="material-icons">
              {{themeService.isDarkMode() ? 'light_mode' : 'dark_mode'}}
            </span>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      // background-color: var(--card-background);
      background-color: black;
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px var(--shadow-color);
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--primary-color);
      text-decoration: none;
      transition: color 0.3s;
    }

    .logo:hover {
      color: var(--secondary-color);
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .nav-links a {
      color: var(--text-color);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s;
      position: relative;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: var(--primary-color);
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -4px;
      left: 0;
      background-color: var(--primary-color);
      transition: width 0.3s;
    }

    .nav-links a:hover::after,
    .nav-links a.active::after {
      width: 100%;
    }

    .theme-toggle {
      background: none;
      border: none;
      color: var(--text-color);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s;
    }

    .theme-toggle:hover {
      background-color: var(--hover-color);
    }

    @media (max-width: 768px) {
      .nav-links {
        gap: 1rem;
      }
    }
  `]
})
export class NavbarComponent {
  themeService = inject(ThemeService);
}
