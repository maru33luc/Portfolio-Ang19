import { Component, inject, HostListener, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
     <nav class="navbar">
      <div class="nav-container">
        <a routerLink="/" class="logo">
          <img src="../../../../assets/img/mari.png" alt="Logo">
        </a>
        <button class="menu-toggle" (click)="toggleMenu()">
          <span class="menu-icon">{{ isMenuOpen ? '&times;' : '&#9776;' }}</span>
        </button>
        <div class="nav-links" [class.active]="isMenuOpen">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="closeMenu()">Home</a>
          <a routerLink="/about" routerLinkActive="active" (click)="closeMenu()">About</a>
          <a routerLink="/projects" routerLinkActive="active" (click)="closeMenu()">Projects</a>
          <a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Contact</a>
          <button class="theme-toggle" (click)="themeService.toggleTheme()">
            <span>{{ themeService.isDarkMode() ? 'light_mode' : 'dark_mode' }}</span>
          </button>
        </div>
      </div>
    </nav>
  `,
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  themeService = inject(ThemeService);
  isMenuOpen = false;
  private scrollListener: (() => void) | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    } else {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }

  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (typeof window !== 'undefined' && window.innerWidth > 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.initializeNavbarEffects();
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined' && this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private initializeNavbarEffects() {
    const navbar = this.el.nativeElement.querySelector('.navbar');
    const navLinks = this.el.nativeElement.querySelectorAll('.nav-links a');
    const themeToggle = this.el.nativeElement.querySelector('.theme-toggle');

    navLinks.forEach((link: HTMLElement) => {
      this.renderer.setStyle(link, 'color', 'white');
    });

    if (themeToggle) {
      this.renderer.setStyle(themeToggle, 'color', 'white');
    }

    this.scrollListener = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 300;
      const opacity = Math.min(scrollPosition / maxScroll, 1);

      if (this.themeService.isDarkMode()) {
        this.renderer.setStyle(navbar, 'background-color', 'var(--navbar-background)');
        return;
      }

      this.renderer.setStyle(navbar, 'background-color', `rgba(255, 255, 255, ${0.2 + 0.8 * opacity})`);

      if (scrollPosition > 50) {
        navLinks.forEach((link: HTMLElement) => {
          this.renderer.setStyle(link, 'color', 'var(--text-color)');
        });
        if (themeToggle) {
          this.renderer.setStyle(themeToggle, 'color', 'var(--text-color)');
        }
      } else {
        navLinks.forEach((link: HTMLElement) => {
          this.renderer.setStyle(link, 'color', 'white');
        });
        if (themeToggle) {
          this.renderer.setStyle(themeToggle, 'color', 'white');
        }
      }
    };

    window.addEventListener('scroll', this.scrollListener);

    if (themeToggle) {
      this.renderer.listen(themeToggle, 'mouseover', () => {
        if (themeToggle.style.color === 'white') {
          this.renderer.setStyle(themeToggle, 'color', 'black');
        }
      });

      this.renderer.listen(themeToggle, 'mouseout', () => {
        if (window.scrollY <= 50) {
          this.renderer.setStyle(themeToggle, 'color', 'white');
        } else {
          this.renderer.setStyle(themeToggle, 'color', 'var(--text-color)');
        }
      });
    }
  }
}