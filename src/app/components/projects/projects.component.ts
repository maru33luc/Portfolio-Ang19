import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="projects-section container fade-in">
      <h1 class="section-title">My Projects</h1>

      <div class="projects-grid">
        <article class="project-card" *ngFor="let project of projects">
          <div class="project-image">
            <img [src]="project.image" [alt]="project.title" />
          </div>
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="tech-stack">
              <span
                class="tech-tag"
                *ngFor="let tech of project.technologies"
                >{{ tech }}</span
              >
            </div>
            <div class="project-links">
              <a
                [href]="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn primary"
              >
                <i class="fa fa-external-link"></i> Live Demo
              </a>
              <a
                [href]="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn secondary"
              >
                <i class="fa fa-github"></i> Source Code
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  `,
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Mise en Place - Kitchen Operations Platform',
      description:
        'Full-stack recipe management workspace for a fine-dining kitchen: recipe collection, daily menu builder with native drag-and-drop, guest-scaled shopping lists and a prep-task tracker with JWT auth, built with Angular 22 and an Express API.',
      image: '../../../assets/img/projects/MiseEnPlace.png',
      technologies: [
        'Angular 22',
        'TypeScript',
        'Angular Signals',
        'RxJS',
        'Node.js',
        'Express',
        'JWT',
      ],
      liveUrl: 'https://frontend-five-theta-bks9oh21fu.vercel.app/',
      githubUrl: 'https://github.com/maru33luc/mise-en-place.git',
    },
    {
      title: 'EcommerceTech - Electronics Store',
      description:
        'Angular 17 e-commerce with role-based auth, real-time search & filters, MercadoPago checkout, Cloudinary uploads, admin dashboard and GSAP animations.',
      image: '../../../assets/img/projects/TechStore.png',
      technologies: [
        'Angular 17',
        'TypeScript',
        'TailwindCSS',
        'RxJS',
        'GSAP',
        'Cloudinary',
        'MercadoPago',
      ],
      liveUrl: 'https://angular-ecommerce-electronics.vercel.app/',
      githubUrl:
        'https://github.com/maru33luc/Angular-Ecommerce-electronics.git',
    },
    {
      title: 'FunkoStore E-Commerce',
      description:
        'Full-stack Funko Pop store with JWT auth, admin dashboard, persistent cart in PostgreSQL, offline cart via IndexedDB, and character data from 4 external APIs.',
      image: '../../../assets/img/projects/FunkoStore.png',
      technologies: [
        'Angular',
        'Node.js',
        'PostgreSQL',
        'Sequelize',
        'TypeScript',
        'JWT',
      ],
      liveUrl: 'https://funko-store-seven.vercel.app/home',
      githubUrl: 'https://github.com/maru33luc/FunkoStore-Postgres-2025.git',
    },

    {
      title: 'MuniApp - Ciudad de Dolores',
      description:
        'Official digital portal for the Municipality of Dolores that lets citizens access municipal services, read local news, and carry a QR-powered digital ID card.',
      image: '../../../assets/img/projects/MuniApp.png',
      technologies: [
        'Angular 18',
        'TypeScript',
        'Bootstrap',
        'GSAP',
        'JWT',
        'PWA',
        'SSR',
      ],
      liveUrl: 'https://muni-app-client.vercel.app/home',
      githubUrl: 'https://github.com/maru33luc/Muni-App-Client.git',
    },
    {
      title: 'KiteSurf School - Booking System',
      description:
        'Full-stack booking platform for a kitesurf school that lets students browse sessions, reserve classes, and manage bookings through a role-based dashboard with real-time availability.',
      image: '../../../assets/img/projects/KitesurfSchool.png',
      technologies: [
        'Angular 20',
        'TypeScript',
        'Node.js',
        'Express',
        'PostgreSQL',
        'JWT',
        'SSR',
      ],
      liveUrl: 'https://kitesurf-app.vercel.app/landing',
      githubUrl: 'https://github.com/maru33luc/kitesurf-app',
    },
    {
      title: 'RAG Neon NVIDIA - Semantic Search & Q&A',
      description:
        'Full-stack RAG application that lets users ingest documents, ask questions in natural language, and get grounded answers via NVIDIA NIM embeddings and Neon pgvector similarity search.',
      image: '../../../assets/img/projects/RAG-Neon-NVIDIA-Demo.png',
      technologies: [
        'Angular 19',
        'TypeScript',
        'Neon pgvector',
        'NVIDIA NIM',
        'Vercel',
        'Node.js',
      ],
      liveUrl: 'https://rag-nvidia-demo.vercel.app/',
      githubUrl: 'https://github.com/maru33luc/rag-neon-nvidia-demo',
    },
    {
      title: 'Task Manager with Applied Security',
      description:
        'Full-stack task manager with Angular 18 and NestJS, featuring JWT auth with refresh tokens, bcrypt hashing, rate limiting, Helmet CSP, and supply chain protection via exact versions and ignore-scripts.',
      image: '../../../assets/img/projects/Safe Task Manager.png',
      technologies: [
        'Angular 18',
        'NestJS',
        'TypeORM',
        'JWT',
        'Playwright',
        'TailwindCSS',
      ],
      liveUrl: 'https://task-manager-zeta-six-44.vercel.app/auth/login',
      githubUrl: 'https://github.com/maru33luc/task-manager',
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
}
