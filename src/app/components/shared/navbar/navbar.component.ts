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
    this.updateMenuColors();
    this.adjustMenuIconPosition();
  }

  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.renderer.removeStyle(document.body, 'overflow');
    }
    this.updateMenuColors();
    this.adjustMenuIconPosition();
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
    this.updateMenuColors();
    this.setupScrollListener();
    this.adjustMenuIconPosition();
  }

  private setupScrollListener() {
    const navbar = this.el.nativeElement.querySelector('.navbar');
    const navLinks = this.el.nativeElement.querySelectorAll('.nav-links a');
    const themeToggle = this.el.nativeElement.querySelector('.theme-toggle');
    const menuIcon = this.el.nativeElement.querySelector('.menu-icon');

    this.scrollListener = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 50;

      if (this.themeService.isDarkMode()) {
        this.renderer.setStyle(navbar, 'background-color', 'var(--navbar-background)');
      } else {
        this.renderer.setStyle(navbar, 'background-color', `rgba(255, 255, 255, ${Math.min(0.2 + scrollPosition / maxScroll, 1)})`);
      }

      const textColor = scrollPosition > 50 ? 'var(--text-color)' : 'white';
      const afterColor = scrollPosition > 50 ? 'after-color' : '';

      navLinks.forEach((link: HTMLElement) => {
        this.renderer.setStyle(link, 'color', textColor);
        if (afterColor) {
          this.renderer.addClass(link, afterColor);
        } else {
          this.renderer.removeClass(link, 'after-color');
        }
      });

      this.renderer.setStyle(menuIcon, 'color', textColor);
      
      if (themeToggle) {
        this.renderer.setStyle(themeToggle, 'color', textColor);
      }
    };

    window.addEventListener('scroll', this.scrollListener);
  }

  private updateMenuColors() {
    const navLinks = this.el.nativeElement.querySelectorAll('.nav-links a');
    const themeToggle = this.el.nativeElement.querySelector('.theme-toggle');
    const menuIcon = this.el.nativeElement.querySelector('.menu-icon');

    let textColor = this.themeService.isDarkMode() ? 'white' : 'var(--text-color)';

    if (!this.themeService.isDarkMode() && this.isMenuOpen) {
      textColor = 'white';
      this.renderer.setStyle(menuIcon, 'color', 'white');
    }

    navLinks.forEach((link: HTMLElement) => {
      this.renderer.setStyle(link, 'color', textColor);
    });

    if (themeToggle) {
      this.renderer.setStyle(themeToggle, 'color', textColor);
    }
  }

  private adjustMenuIconPosition() {
    const menuToggle = this.el.nativeElement.querySelector('.menu-toggle');
    if (menuToggle) {
      if (this.isMenuOpen) {
        this.renderer.setStyle(menuToggle, 'margin-right', '10px'); 
        this.renderer.setStyle(menuToggle, 'font-size', '2.8rem');
      } else {
        this.renderer.removeStyle(menuToggle, 'margin-right');
        this.renderer.removeStyle(menuToggle, 'font-size');
      }
    }
  }
}