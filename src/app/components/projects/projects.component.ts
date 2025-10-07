import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
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
            <img [src]="project.image" [alt]="project.title">
          </div>
          <div class="project-content">
            <h3 class="project-title">{{project.title}}</h3>
            <p class="project-description">{{project.description}}</p>
            <div class="tech-stack">
              <span class="tech-tag" *ngFor="let tech of project.technologies">{{tech}}</span>
            </div>
            <div class="project-links">
              <a [href]="project.liveUrl" target="_blank" rel="noopener noreferrer" class="btn primary">
                <i class="fa fa-external-link"></i> Live Demo
              </a>
              <a [href]="project.githubUrl" target="_blank" rel="noopener noreferrer" class="btn secondary">
                <i class="fa fa-github"></i> Source Code
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  `,
  styleUrl: "./projects.component.css"
})
export class ProjectsComponent {
  projects = [
    {
      title: 'TechStore - E-Commerce Platform',
      description: 'A full-featured e-commerce platform with real-time inventory management and secure payment processing.',
      image: '../../../assets/img/projects/TechStore.png',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://angular-ecommerce-electronics.vercel.app/',
      githubUrl: 'https://github.com/maru33luc/Angular-Ecommerce-electronics.git'
    },
    {
      title: 'FunkoStore E-Commerce Platform',
      description: 'A full-featured e-commerce platform with real-time inventory management and secure payment processing.',
      image: '../../../assets/img/projects/FunkoStore.png',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://funko-store-seven.vercel.app/home',
      githubUrl: 'https://github.com/maru33luc/FunkoStore-Postgres-2025.git'
    },
    {
      title: 'MuniApp - Municipal Services App',
      description: 'A weather dashboard that provides real-time weather information and forecasts using multiple APIs.',
      image: '../../../assets/img/projects/MuniApp.png',
      technologies: ['Vue.js', 'OpenWeather API', 'Chart.js'],
      liveUrl: 'https://pruebapwapush.vercel.app/home',
      githubUrl: 'https://github.com/maru33luc/Muni-App-Client.git'
    },
    {
      title: 'Kitesurf School - Booking System',
      description: 'Full-stack system built with Angular, Node.js, and PostgreSQL to manage bookings, classes, and instructors for a kitesurf school, featuring an admin dashboard and Docker deployment.',
      image: '../../../assets/img/projects/KitesurfSchool.png',
      technologies: ['Angular 20', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'Angular Material'],
      liveUrl: 'https://kitesurf-app.vercel.app/landing',
      githubUrl: 'https://github.com/maru33luc/kitesurf-app'
    },
    {
      title: 'AppNotes - Note Taking App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      image: '../../../assets/img/projects/AppNotes.png',
      technologies: ['React', 'Firebase', 'Material-UI', 'Redux'],
      liveUrl: 'https://app-notes-challenge-cli.vercel.app/notes-list',
      githubUrl: 'https://github.com/maru33luc/App-Notes-Challenge.git'
    }
  ];
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(){
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
}