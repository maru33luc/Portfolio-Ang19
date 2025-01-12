import { Component, AfterViewInit, Inject, PLATFORM_ID, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import ScrollReveal from 'scrollreveal';
import { isPlatformBrowser } from '@angular/common';

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
              <ng-container *ngFor="let item of itemsSignal()">
                <h2>{{item.period}}</h2>
                <div class="timeline-item"
                     [class.experience]="item.type === 'experience'"
                     [class.education]="item.type === 'education'"
                     >
                  <div class="timeline-badge">
                    <i [class]="item.type === 'experience' ? 'fas fa-briefcase' : 'fas fa-graduation-cap'"></i>
                  </div>

                  <div class="timeline-content">
                  <div class="timeline-date">{{item.period}}</div>
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

    .timeline-header h4{
      margin:0;
    }

    .timeline-item {
      position: relative;
      margin-bottom: 4rem;
      width: calc(50% - 2rem);
      opacity: 0;
      transition: all 0.5s ease;
      transform: translateY(50px); /* Element starts from below */
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
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      top: 0;
    }

    .timeline-item:nth-child(odd) .timeline-badge {
      left: 5px;
    }

    .timeline-item:nth-child(even) .timeline-badge {
      right: 5px;
    }

    .timeline-content {
      background: var(--card-background);
      padding: 1rem;
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
      margin: 0.5rem 0;

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
        padding-left: 0;
        padding-right: 0;
      }

      .timeline-item:nth-child(odd) {
        text-align: left;
      }

      .timeline-item:nth-child(even) {
        text-align: right;
      }
    }
  `],
})
export class AboutComponent {
  // showExperience = true;
  // showEducation = true;
  showAll = true;
  showExperience = true;
  showEducation = true;


  items: TimelineItem[] = [
    {
      period: 'May. 2024 - Actualidad · 9 meses',
      description: 'Configuración y optimización de flujos de trabajo dentro de SAP para clientes internos, con el objetivo de mejorar la eficiencia operativa y garantizar que los procesos financieros se alineen con los requisitos del negocio. Gestión de configuraciones, resolución de incidencias y apoyo a la mejora continua de los sistemas en el módulo FI (Finanzas), con un enfoque particular en las áreas de Record to Report (RTR) y Treasury and Risk Management (TRM).',
      location: 'Mar del Plata, Provincia de Buenos Aires, Argentina · En remoto',
      type: 'experience',
      role: 'Packaged App Development Associate SAP',
      company: 'Accenture'
    },
    {
      period: 'Oct. 2024 - Dic. 2024 · 3 meses',
      description: 'Desarrollo del curso "Desarrollo Frontend con Angular, JavaScript y Tecnologías Complementarias", capacitando a estudiantes en el desarrollo de aplicaciones modernas utilizando Angular y tecnologías relacionadas. Diseño y ejecución de un plan de estudios que incluyó temas como creación de componentes, directivas, y servicios, gestión de datos con observables y RxJS, diseño y validación de formularios reactivos, y enrutamiento en Angular.',
      location: 'Mar del Plata, Provincia de Buenos Aires, Argentina · En remoto',
      type: 'experience',
      role: 'Profesora - Desarrollo Frontend con Angular, JavaScript y Tecnologías Complementarias',
      company: 'ATICMA'
    },
    {
      period: 'Mar. 2023 - May. 2024 · 1 año 3 meses',
      description: 'Experiencia en la creación de aplicaciones web modernas utilizando Angular para el frontend y Node.js junto con Express para el backend. Enfoque en soluciones escalables y eficientes, con énfasis en bases de datos, autenticación y mejoras en la experiencia del usuario.',
      location: 'En remoto',
      type: 'experience',
      role: 'Desarrollador de aplicaciones con Angular + NodeJs',
      company: 'Autónomo'
    },
    {
      period: 'Mar. 2023 - Jul. 2023 · 5 meses',
      description: 'Desarrollo de aplicaciones web utilizando Python + Django. Uso de tecnologías como Bootstrap para mejorar la experiencia del usuario y herramientas como Pillow, pydantic y sqlparse para mejorar la eficiencia y seguridad del proyecto.',
      location: 'En remoto',
      type: 'experience',
      role: 'Desarrollador de aplicaciones Python + Django',
      company: 'Autónomo'
    },
    {
      period: 'Oct. 2022 - Jun. 2023 · 9 meses',
      description: 'Desarrollo de aplicaciones en Java y JavaFX, utilizando patrones de diseño como MVC para mejorar la mantenibilidad del código. Implementación de autenticación de usuarios, encriptación de contraseñas y optimización de la interfaz gráfica con JavaFX.',
      location: 'En remoto',
      type: 'experience',
      role: 'Desarrollador de Aplicaciones Java + JavaFX',
      company: 'Autónomo'
    },
    {
      period: 'Ene. 2023 - Abr. 2023 · 4 meses',
      description: 'Ejecutiva de Cuentas del sector Claro Empresas. Venta y asesoramiento sobre servicios tecnológicos como almacenamiento en la nube, servidores virtuales, redes virtuales, tecnología de IoT y herramientas colaborativas y de gestión.',
      location: 'Mar del Plata, Provincia de Buenos Aires, Argentina · Presencial',
      type: 'experience',
      role: 'Ejecutiva de cuentas',
      company: 'Claro Argentina'
    },
    {
      period: 'Feb. 2022 - Nov. 2023',
      description: 'Graduated with a degree in Technological Programming, focusing on web development technologies such as Angular, JavaScript, NodeJS, Firebase, and Firestore. I also gained experience with database management (MySQL, Sequelize) and project management tools like Jira and Trello.',
      location: 'Argentina',
      type: 'education',
      degree: 'Tecnicatura Universitaria en Programación, Tecnología de la Información',
      institution: 'Universidad Tecnológica Nacional',
    },
    {
      period: 'Mar. 2023 - Jun. 2023',
      description: 'Specialized in Django, working with Python and MySQL. This course deepened my skills in backend development and web frameworks.',
      location: 'Argentina',
      type: 'education',
      degree: 'Especialización en Django',
      institution: 'Universidad Tecnológica Nacional',
    },
    {
      period: 'Ago. 2023 - Dic. 2023',
      description: 'Completed a Full Stack web development course with a focus on JavaScript, NodeJS, and backend technologies, including ExpressJS, Sequelize, and MySQL. Projects included building dynamic web applications with the full stack.',
      location: 'Argentina',
      type: 'education',
      degree: 'Full Stack - Desarrollo Web',
      institution: 'Codo a Codo - Gobierno de la Ciudad de Buenos Aires',
    },
    {
      period: 'Ene. 2023',
      description: 'Completed an academic update on the use of digital ecosystems in educational settings, learning how to integrate technology in teaching.',
      location: 'Argentina',
      type: 'education',
      degree: 'Actualización Académica en Ecosistemas Digitales en la Escuela',
      institution: 'Universidad FASTA',
    },
    {
      period: 'Jul. 2015 - Dic. 2021',
      description: 'Earned a degree in History with a focus on teaching and humanities studies, gaining strong pedagogical and seminar facilitation skills.',
      location: 'Mar del Plata, Argentina',
      type: 'education',
      degree: 'Profesor en Historia',
      institution: 'Universidad Nacional de Mar del Plata',
    },
    {
      period: 'Jun. 2023 - Ago. 2023',
      description: 'Specialized in Python for Data Science, gaining experience with libraries such as Pandas, Scikit-learn, Numpy, Matplotlib, and Seaborn for data analysis.',
      location: 'Argentina',
      type: 'education',
      degree: 'Python para Data Science',
      institution: 'Alura',
    },
    {
      period: 'Ene. 2024 - Feb. 2024',
      description: 'Completed a Bootcamp in SAP FI-CO, focusing on the configuration and management of SAP financial modules for business processes.',
      location: 'Argentina',
      type: 'education',
      degree: 'Bootcamp SAP FI-CO',
      institution: 'Accenture',
    }
    // Add more items here
  ];

  itemsExperience = this.items.filter((item) => item.type === 'experience');
  itemsEducation = this.items.filter((item) => item.type === 'education');
  itemsSignal = signal<TimelineItem[]>([]);


  constructor(@Inject(PLATFORM_ID) private platformId: any, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.itemsSignal.set(this.items);
    console.log(this.itemsSignal());
  }

  ngAfterViewInit() {

    this.animationItems();
  }

  animationItems() {
    if (isPlatformBrowser(this.platformId)) {
      import('scrollreveal').then((ScrollReveal) => {
        const sr = ScrollReveal.default;

        // Aquí seleccionas los elementos de la línea de tiempo y aplicas la animación
        sr().reveal('.timeline-item', {
          duration: 1000,
          origin: 'bottom',
          distance: '50px',
          delay: 200,
          reset: false,
          viewFactor: 0.2,
          easing: 'ease-in-out',
          opacity: 0,
          scale: 0.8,
        });
      });
    }

  }

  filterItems(type: 'all' | 'experience' | 'education') {
    switch (type) {
      case 'all':
        this.showAll = true;
        this.showExperience = true;
        this.showEducation = true;
        this.itemsSignal.set(this.items);
        this.animationItems();
        break;
      case 'experience':
        this.showAll = false;
        this.showExperience = true;
        this.showEducation = false;
        this.itemsSignal.set(this.itemsExperience);
        this.animationItems();
        break;
      case 'education':
        this.showAll = false;
        this.showExperience = false;
        this.showEducation = true;
        this.itemsSignal.set(this.itemsEducation);
        this.animationItems();
        break;
    }
  }
}
