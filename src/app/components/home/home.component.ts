import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="hero fade-in">
      <div class="container">
        <div class="hero-content">
          <h1>Welcome to My Portfolio</h1>
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
        <div class="skill-card" *ngFor="let skill of skills">
          <i [class]="skill.icon"></i>
          <h3>{{skill.name}}</h3>
          <p>{{skill.description}}</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      padding: 4rem 0;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
      color: white;
      text-align: center;
      clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
      margin-bottom: 4rem;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .subtitle {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 500;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    }

    .btn.primary {
      background: white;
      color: var(--primary-color);
    }

    .btn.secondary {
      background: transparent;
      border: 2px solid white;
      color: white;
    }

    .skills {
      padding: 4rem 0;
    }

    h2 {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 2rem;
      color: var(--text-color);
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .skill-card {
      padding: 2rem;
      background: var(--card-background);
      border-radius: 1rem;
      text-align: center;
      transition: transform 0.3s;
    }

    .skill-card:hover {
      transform: translateY(-5px);
    }

    .skill-card i {
      font-size: 2.5rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .skill-card h3 {
      margin-bottom: 0.5rem;
      color: var(--text-color);
    }

    .skill-card p {
      color: var(--text-color);
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1.25rem;
      }

      .hero {
        padding: 2rem 0;
      }

      .cta-buttons {
        flex-direction: column;
      }

      .skills-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  skills = [
    {
      name: 'Frontend Development',
      description: 'Angular, React, Vue.js, and modern CSS',
      icon: 'fas fa-code'
    },
    {
      name: 'Backend Development',
      description: 'Node.js, Python, and databases',
      icon: 'fas fa-server'
    },
    {
      name: 'UI/UX Design',
      description: 'Figma, Adobe XD, and user research',
      icon: 'fas fa-paint-brush'
    },
    {
      name: 'DevOps',
      description: 'Docker, CI/CD, and cloud platforms',
      icon: 'fas fa-cloud'
    }
  ];
}
