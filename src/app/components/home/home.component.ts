import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import ScrollReveal from 'scrollreveal';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="hero fade-in">
      <div class="container">
        <div class="hero-content glass-effect">
          <h1>Welcome to my Portfolio</h1>
          <p class="subtitle">Full Stack Developer & UI/UX Enthusiast</p>
          <div class="cta-buttons">
            <a routerLink="/projects" class="btn primary">View Projects</a>
            <a routerLink="/contact" class="btn secondary">Contact Me</a>
          </div>
        </div>
      </div>
    </section>

    <section class="skills container">
      <h2>Skills & Expertise</h2>
      <div class="skills-grid">
        <div class="skill-card card" *ngFor="let skill of skills">
          <i [class]="skill.icon"></i>
          <h3>{{ skill.name }}</h3>
          <p>{{ skill.description }}</p>
        </div>
      </div>
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  skills = [
    {
      name: 'Frontend Development',
      description: 'Angular, React, Vue.js, and modern CSS',
      icon: 'fa fa-code',
    },
    {
      name: 'Backend Development',
      description: 'Node.js, Python, and databases',
      icon: 'fa fa-server',
    },
    {
      name: 'UI/UX Design',
      description: 'Figma, Adobe XD, and user research',
      icon: 'fa fa-paint-brush',
    },
    {
      name: 'DevOps',
      description: 'Docker, CI/CD, and cloud platforms',
      icon: 'fa fa-cloud',
    },
  ];

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then((ScrollReveal) => {
        const sr = ScrollReveal.default;
        sr().reveal('.skills', {
          duration: 1000, // Duración de la animación en milisegundos.
          origin: 'left', // Dirección desde donde aparece el elemento ('left', 'right', 'top', 'bottom').
          distance: '50px', // Distancia que recorre el elemento durante la animación.
          delay: 200, // Retardo antes de que comience la animación (en ms).
          reset: false, // Si es `true`, la animación se reinicia al hacer scroll fuera y volver al elemento.
          viewFactor: 0.2, // Proporción del elemento visible antes de activar la animación (0 a 1).
          viewOffset: {
            // Agrega un desplazamiento al viewport.
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
          easing: 'ease-in-out', // Efecto de transición para la animación.
          opacity: 0, // Controla la opacidad inicial del elemento.
          scale: 0.8, // Escala inicial del elemento (0 a 1).
        });
      });
    }
  }
}
