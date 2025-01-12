import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
            <p>With a passion for creating beautiful and functional web applications, I specialize in modern web technologies and user-centric design.</p>
          </div>
        </div>

        <div class="experience-section">
          <h3>Experience</h3>
          <div class="timeline">
            <div class="timeline-item" *ngFor="let exp of experience">
              <div class="timeline-date">{{exp.period}}</div>
              <div class="timeline-content">
                <h4>{{exp.role}}</h4>
                <h5>{{exp.company}}</h5>
                <p>{{exp.description}}</p>
              </div>
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
      max-width: 900px;
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

    .experience-section {
      padding: 2rem;
      background: var(--card-background);
      border-radius: 1rem;
      box-shadow: 0 4px 6px var(--shadow-color);
    }

    .experience-section h3 {
      color: var(--primary-color);
      margin-bottom: 2rem;
    }

    .timeline {
      position: relative;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 2px;
      background: var(--primary-color);
    }

    .timeline-item {
      padding-left: 2rem;
      position: relative;
      margin-bottom: 2rem;
    }

    .timeline-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--primary-color);
      transform: translateX(-5px);
    }

    .timeline-date {
      color: var(--primary-color);
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .timeline-content {
      background: var(--background-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px var(--shadow-color);
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

      .timeline {
        padding-left: 1rem;
      }

      .timeline::before {
        left: 0;
      }

      .timeline-item {
        padding-left: 2rem;
      }

      .timeline-item::before {
        left: 0;
        transform: translateX(-5px);
        top: 8px;
      }

      .timeline-date {
        text-align: left;
        font-size: 0.9rem;
        margin-bottom: 0.75rem;
      }

      .timeline-content {
        padding: 1rem;
      }

      .timeline-content h4 {
        font-size: 1.1rem;
      }

      .timeline-content h5 {
        font-size: 1rem;
      }

      .timeline-content p {
        font-size: 0.9rem;
      }
    }

    @media (max-width: 480px) {
      .profile-section {
        padding: 1rem;
      }

      .timeline {
        padding-left: 0.5rem;
      }

      .timeline-item {
        padding-left: 1.5rem;
      }

      .timeline-content {
        padding: 0.75rem;
      }
    }
  `]
})
export class AboutComponent {
  experience = [
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
  ]
  
}
