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
  styles: [`
    .projects-section {
      padding: 4rem 0;
    }

    h1 {
      text-align: center;
      margin-bottom: 3rem;
      color: var(--text-color);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .project-card {
      background: var(--card-background);
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 4px 6px var(--shadow-color);
      transition: transform 0.3s;
    }

    .project-card:hover {
      // transform: translateY(-5px);
    }

    .project-image {
      width: 100%;
      height: 200px;
      overflow: hidden;
    }

    .project-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .project-card:hover .project-image img {
      transform: scale(1.05);
    }

    .project-content {
      padding: 1.5rem;
    }

    h3 {
      color: var(--text-color);
      margin-bottom: 1rem;
    }

    .project-description {
      color: var(--text-color);
      opacity: 0.8;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .tech-tag {
      background: var(--primary-color);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.875rem;
    }

    .project-links {
      display: flex;
      gap: 1rem;
    }

    .btn {
      flex: 1;
      padding: 0.75rem;
      border-radius: 0.5rem;
      text-decoration: none;
      text-align: center;
      font-weight: 500;
      transition: transform 0.3s, box-shadow 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px var(--shadow-color);
    }

    .btn.primary {
      background: var(--primary-color);
      color: white;
    }

    .btn.secondary {
      background: transparent;
      border: 2px solid var(--primary-color);
      color: var(--primary-color);
    }

    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
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
