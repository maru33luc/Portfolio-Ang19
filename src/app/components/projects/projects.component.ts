import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="projects-section container fade-in">
      <h1>My Projects</h1>

      <div class="projects-grid">
        <article class="project-card" *ngFor="let project of projects">
          <div class="project-image">
            <img [src]="project.image" [alt]="project.title">
          </div>
          <div class="project-content">
            <h3>{{project.title}}</h3>
            <p class="project-description">{{project.description}}</p>
            <div class="tech-stack">
              <span class="tech-tag" *ngFor="let tech of project.technologies">{{tech}}</span>
            </div>
            <div class="project-links">
              <a [href]="project.liveUrl" target="_blank" rel="noopener noreferrer" class="btn primary">
                <i class="fas fa-external-link-alt"></i> Live Demo
              </a>
              <a [href]="project.githubUrl" target="_blank" rel="noopener noreferrer" class="btn secondary">
                <i class="fab fa-github"></i> Source Code
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
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with real-time inventory management and secure payment processing.',
      image: 'assets/projects/ecommerce.jpg',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://example.com/ecommerce',
      githubUrl: 'https://github.com/yourusername/ecommerce'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      image: 'assets/projects/taskapp.jpg',
      technologies: ['React', 'Firebase', 'Material-UI', 'Redux'],
      liveUrl: 'https://example.com/taskapp',
      githubUrl: 'https://github.com/yourusername/taskapp'
    },
    {
      title: 'Weather Dashboard',
      description: 'A weather dashboard that provides real-time weather information and forecasts using multiple APIs.',
      image: 'assets/projects/weather.jpg',
      technologies: ['Vue.js', 'OpenWeather API', 'Chart.js'],
      liveUrl: 'https://example.com/weather',
      githubUrl: 'https://github.com/yourusername/weather'
    }
  ];
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}


}
