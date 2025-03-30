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
          <p class="subtitle">Full Stack Developer & SAP Application Developer</p>
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
      description: 'HTML, CSS, JavaScript, TypeScript and Angular',
      icon: 'fa fa-code',
    },
    {
      name: 'Backend Development',
      description: 'Node.js, Python, Django, Java, JavaFx, MySQL, and PostgreSQL',
      icon: 'fa fa-server',
    },
    {
      name: 'UI/UX Design',
      description: 'Figma, Adobe XD, and user research',
      icon: 'fa fa-paint-brush',
    },
    {
      name: 'DevOps',
      description: 'Docker, CI/CD, Git & GitHub and cloud platforms',
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
          duration: 1000, 
          origin: 'left', 
          distance: '50px', 
          delay: 200,
          reset: false, 
          viewFactor: 0.2, 
          viewOffset: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
          easing: 'ease-in-out', 
          opacity: 0,
          scale: 0.8,
        });
      });
    }
  }
}
