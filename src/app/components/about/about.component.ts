import { Component, AfterViewInit, Inject, PLATFORM_ID, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import ScrollReveal from 'scrollreveal';
import { isPlatformBrowser } from '@angular/common';
import { ElapsedTimePipe } from '../shared/pipes/elapsed-time.pipe';

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
  imports: [CommonModule, ElapsedTimePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  showAll = signal<boolean>(true);
  showExperience = signal<boolean>(false);
  showEducation = signal<boolean>(false);

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
      period: 'Feb. 2022 - Nov. 2023',
      description: 'Graduated with a degree in Technological Programming, focusing on web development technologies such as Angular, JavaScript, NodeJS, Firebase, and Firestore. I also gained experience with database management (MySQL, Sequelize) and project management tools like Jira and Trello.',
      location: 'Argentina',
      type: 'education',
      degree: 'Tecnicatura Universitaria en Programación, Tecnología de la Información',
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
      period: 'Ene. 2024 - Feb. 2024',
      description: 'Completed a Bootcamp in SAP FI-CO, focusing on the configuration and management of SAP financial modules for business processes.',
      location: 'Argentina',
      type: 'education',
      degree: 'Bootcamp SAP FI-CO',
      institution: 'Accenture',
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
      period: 'Jun. 2023 - Ago. 2023',
      description: 'Specialized in Python for Data Science, gaining experience with libraries such as Pandas, Scikit-learn, Numpy, Matplotlib, and Seaborn for data analysis.',
      location: 'Argentina',
      type: 'education',
      degree: 'Python para Data Science',
      institution: 'Alura',
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
      period: 'Mar. 2023 - Jun. 2023',
      description: 'Specialized in Django, working with Python and MySQL. This course deepened my skills in backend development and web frameworks.',
      location: 'Argentina',
      type: 'education',
      degree: 'Especialización en Django',
      institution: 'Universidad Tecnológica Nacional',
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
    }
  ];


  itemsExperience = this.items.filter((item) => item.type === 'experience');
  itemsEducation = this.items.filter((item) => item.type === 'education');
  itemsSignal = signal<TimelineItem[]>([]);


  constructor(@Inject(PLATFORM_ID) private platformId: any, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.itemsSignal.set(this.items);
    console.log(this.itemsSignal());
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  ngAfterViewInit() {

    this.animationItems();
  }

  animationItems() {
    if (isPlatformBrowser(this.platformId)) {
      import('scrollreveal').then((ScrollReveal) => {
        const sr = ScrollReveal.default;

        sr().reveal('.timeline-item', {
          duration: 1000,
          origin: 'bottom',
          distance: '50px',
          delay: 200,
          reset: false,
          viewFactor: 0.6,
          easing: 'ease-in-out',
          scale: 0.8,
          afterReveal: function (el) {
            console.log(`Revealed: ${el}`);
          },
        });
      });
    }

  }

  filterItems(type: 'all' | 'experience' | 'education') {
    switch (type) {
      case 'all':
        this.itemsSignal.set(this.items);
        this.showAll.set(true);
        this.showExperience.set(false);
        this.showEducation.set(false);
        break;
      case 'experience':
        this.itemsSignal.set(this.items.filter((item) => item.type === 'experience'));
        this.showAll.set(false);
        this.showExperience.set(true);
        this.showEducation.set(false);

        break;
      case 'education':
        this.itemsSignal.set(this.items.filter((item) => item.type === 'education'));
        this.showAll.set(false);
        this.showExperience.set(false);
        this.showEducation.set(true);
        break;
    }
    this.animationItems();
  }

}
