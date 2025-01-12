import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  location: string;
}

interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  description: string;
  location: string;
}

type TimelineItem = {
  period: string;
  description: string;
  location: string;
  type: 'experience' | 'education';
} & (
  | { type: 'experience'; role: string; company: string }
  | { type: 'education'; degree: string; institution: string }
);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="about-section container fade-in">
      <h1>About Me</h1>
      
      <div class="about-content">
        <div class="profile-section">
          <img src="assets/img/mari.png" alt="Profile picture" class="profile-image">
          <div class="bio">
            <h2>Full Stack Developer</h2>
            <p>Estudiante de Ingeniería en Sistemas de Información en la UTN FRMDP, con pasión por el desarrollo web y la tecnología. Me especializo en el desarrollo de aplicaciones web modernas y funcionales, con un enfoque en la experiencia del usuario.</p>
          </div>
        </div>

        <div class="journey-section">
          <div class="timeline-filters">
            <button [class.active]="showAll" (click)="filterItems('all')">All</button>
            <button [class.active]="showExperience" (click)="filterItems('experience')">Experience</button>
            <button [class.active]="showEducation" (click)="filterItems('education')">Education</button>
          </div>

          <div class="timeline-container">
            <div class="timeline">
              <ng-container *ngFor="let item of sortedItems">
                <div class="timeline-item" [class.experience]="item.type === 'experience'" [class.education]="item.type === 'education'"
                     [class.hidden]="(item.type === 'experience' && !showExperience) || (item.type === 'education' && !showEducation)">
                  <div class="timeline-badge">
                    <i [class]="item.type === 'experience' ? 'fas fa-briefcase' : 'fas fa-graduation-cap'"></i>
                  </div>
                  <div class="timeline-date">{{item.period}}</div>
                  <div class="timeline-content">
                    <div class="timeline-header">
                      <span class="badge" [class.experience-badge]="item.type === 'experience'" 
                                        [class.education-badge]="item.type === 'education'">
                        {{item.type}}
                      </span>
                      <h4>{{item.type === 'experience' ? item.role : item.degree}}</h4>
                      <h5>{{item.type === 'experience' ? item.company : item.institution}}</h5>
                    </div>
                    <p [innerHTML]="item.description"></p>
                    <div class="location" *ngIf="item.location">
                      <i class="fas fa-map-marker-alt"></i> {{item.location}}
                    </div>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      padding: 4rem 0;
    }

    h1 {
      text-align: center;
      margin-bottom: 3rem;
      color: var(--text-color);
    }

    .about-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .profile-section {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 4rem;
      padding: 2rem;
      background: var(--card-background);
      border-radius: 1rem;
      box-shadow: 0 4px 6px var(--shadow-color);
    }

    .profile-image {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid var(--primary-color);
    }

    .bio {
      flex: 1;
    }

    .bio h2 {
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .bio p {
      color: var(--text-color);
      line-height: 1.6;
    }

    .timeline-filters {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .timeline-filters button {
      padding: 0.5rem 1.5rem;
      border: none;
      border-radius: 2rem;
      background: var(--card-background);
      color: var(--text-color);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .timeline-filters button.active {
      background: var(--primary-color);
      color: white;
    }

    .timeline-container {
      position: relative;
      padding: 2rem 0;
    }

    .timeline {
      position: relative;
      max-width: 1000px;
      margin: 0 auto;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      height: 100%;
      width: 2px;
      background: var(--primary-color);
      transform: translateX(-50%);
    }

    .timeline-item {
      position: relative;
      margin-bottom: 4rem;
      width: calc(50% - 2rem);
      opacity: 1;
      transition: all 0.5s ease;
    }

    .timeline-item.hidden {
      opacity: 0;
      height: 0;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }

    .timeline-item:nth-child(odd) {
      margin-left: auto;
      padding-left: 3rem;
    }

    .timeline-item:nth-child(even) {
      margin-right: auto;
      padding-right: 3rem;
      text-align: right;
    }

    .timeline-badge {
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      top: 0;
    }

    .timeline-item:nth-child(odd) .timeline-badge {
      left: -20px;
    }

    .timeline-item:nth-child(even) .timeline-badge {
      right: -20px;
    }

    .timeline-content {
      background: var(--card-background);
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px var(--shadow-color);
    }

    .timeline-header {
      margin-bottom: 1rem;
    }

    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
    }

    .experience-badge {
      background: #4CAF50;
      color: white;
    }

    .education-badge {
      background: #2196F3;
      color: white;
    }

    .timeline-content h4 {
      color: var(--text-color);
      margin-bottom: 0.5rem;
    }

    .timeline-content h5 {
      color: var(--secondary-color);
      margin-bottom: 0.5rem;
    }

    .timeline-content p {
      color: var(--text-color);
      opacity: 0.8;
      white-space: pre-line;
      line-height: 1.6;
    }

    .location {
      margin-top: 1rem;
      color: var(--text-color);
      opacity: 0.7;
      font-size: 0.9rem;
    }

    .location i {
      margin-right: 0.5rem;
    }

    @media (max-width: 768px) {
      .profile-section {
        flex-direction: column;
        text-align: center;
        padding: 1.5rem;
      }

      .profile-image {
        width: 150px;
        height: 150px;
      }

      .timeline::before {
        left: 0;
      }

      .timeline-item {
        width: 100%;
        padding-left: 2rem !important;
        margin-left: 0 !important;
        text-align: left !important;
      }

      .timeline-badge {
        left: -20px !important;
      }

      .timeline-item:nth-child(even) {
        padding-right: 0;
      }
    }
  `]
})
export class AboutComponent {
  showAll = true;
  showExperience = true;
  showEducation = true;

  private experience: ExperienceItem[] = [
    {
      period: 'May 2024 - Present',
      role: 'Packaged App Development Associate SAP',
      company: 'Accenture',
      description: `
        Configuración y optimización de flujos de trabajo dentro de SAP para clientes internos, con el objetivo de mejorar la eficiencia operativa y garantizar que los procesos financieros se alineen con los requisitos del negocio. Gestión de configuraciones, resolución de incidencias y apoyo a la mejora continua de los sistemas en el módulo FI (Finanzas), con un enfoque particular en las áreas de Record to Report (RTR) y Treasury and Risk Management (TRM).
        Aptitudes: SAP FI · SAP RTR · Gestión de configuración de software · SAP FICO.
      `,
      location: 'Mar del Plata, Provincia de Buenos Aires, Argentina · Remoto'
    },
    {
      period: 'Oct 2024 - Dec 2024',
      role: 'Instructor - Desarrollo Frontend con Angular, JavaScript y Tecnologías Complementarias',
      company: 'ATICMA',
      description: `
        Diseño y desarrollo del curso 'Desarrollo Frontend con Angular, JavaScript y Tecnologías Complementarias'. Capacitación a estudiantes en:
        - Introducción a Angular y TypeScript.
        - Creación de componentes, directivas, y servicios.
        - Gestión de datos con observables y RxJS.
        - Diseño y validación de formularios reactivos.
        - Enrutamiento y modularización en Angular.
        - Despliegue de aplicaciones en Vercel, uso de GitHub Actions, y publicación en GitHub Pages.
        Guía en proyectos prácticos para fomentar buenas prácticas como modularización, componentes reutilizables, y automatización del despliegue.
        Aptitudes: Angular · GitHub Actions · JavaScript · Desarrollo frontend.
      `,
      location: 'Mar del Plata, Provincia de Buenos Aires, Argentina · Remoto'
    },
    {
      period: 'Mar 2023 - May 2024',
      role: 'Desarrollador de Aplicaciones Angular + Node.js',
      company: 'Freelance',
      description: `
        Desarrollo de aplicaciones web modernas con Angular para el frontend y Node.js/Express en el backend. Enfoque en soluciones escalables y experiencia del usuario.
        - Tecnologías: Angular, Sweet Alert, Ngx-Spinner, AOS, GSAP, Firebase Authentication, Firestore, IndexedDB, Mercado Pago.
        - Optimización con SSR para SEO y rendimiento.
        - Proyectos destacados: E-commerceTech, App-Notes-Challenge, MuniApp.
        Aptitudes: Angular CLI · Express.js · Node.js · SQL · Firebase.
      `,
      location: 'Remoto'
    },
    {
      period: 'Mar 2023 - Jul 2023',
      role: 'Desarrollador de Aplicaciones Python + Django',
      company: 'Freelance',
      description: `
        Creación de aplicaciones web con Python y Django, integrando Bootstrap para mejorar la experiencia del usuario. Implementación de dependencias con virtualenv y herramientas como Pillow, pydantic, y sqlparse para una gestión eficiente de datos.
        Proyectos destacados:
        - Gestión de turnos e información de clínicas.
        Aptitudes: Python · Django.
      `,
      location: 'Remoto'
    },
    {
      period: 'Oct 2022 - Jun 2023',
      role: 'Desarrollador de Aplicaciones Java + JavaFX',
      company: 'Freelance',
      description: `
        Desarrollo de aplicaciones en Java y JavaFX utilizando patrones de diseño como MVC para una arquitectura robusta. Implementación de autenticación segura con Bcrypt.
        Aptitudes: Java · JavaFX · Diseño de patrones.
      `,
      location: 'Remoto'
    }
  ];

  private education: EducationItem[] = [
    {
      period: '2020 - Present',
      degree: 'Computer Engineering',
      institution: 'Universidad Tecnológica Nacional',
      description: `
        Currently pursuing a degree in Computer Engineering with focus on software development,
        algorithms, and system design. Participating in various academic projects and maintaining
        excellent academic standing.
      `,
      location: 'Mar del Plata, Buenos Aires, Argentina'
    },
    {
      period: '2014 - 2019',
      degree: 'Technical High School Diploma in Computer Programming',
      institution: 'E.E.T. N°5',
      description: `
        Completed technical education with focus on programming fundamentals, database management,
        and computer systems. Graduated with honors.
      `,
      location: 'Mar del Plata, Buenos Aires, Argentina'
    }
  ];

  get sortedItems(): TimelineItem[] {
    const experienceItems: TimelineItem[] = this.experience.map(exp => ({
      ...exp,
      type: 'experience'
    }));

    const educationItems: TimelineItem[] = this.education.map(edu => ({
      ...edu,
      type: 'education'
    }));

    return [...experienceItems, ...educationItems].sort((a, b) => {
      const dateA = new Date(a.period.split(' - ')[0]);
      const dateB = new Date(b.period.split(' - ')[0]);
      return dateB.getTime() - dateA.getTime();
    });
  }

  filterItems(type: 'all' | 'experience' | 'education'): void {
    if (type === 'all') {
      this.showAll = true;
      this.showExperience = true;
      this.showEducation = true;
    } else {
      this.showAll = false;
      this.showExperience = type === 'experience';
      this.showEducation = type === 'education';
    }
  }
}
