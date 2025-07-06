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
        period: "March 2025 - Present",
        description: "Training in Linux server administration and security, focusing on implementing robust security policies, protecting critical data, identifying potential threats, and maintaining system stability in business environments. Development of customized security solutions.",
        location: "Argentina",
        type: "education",
        degree: "Linux Network Administrator with Specialization in Cybersecurity and Ethical Hacking",
        institution: "Universidad Tecnológica Nacional"
    },
    {
        period: 'May 2024 - Present · 9 months',
        description: 'Configuration and optimization of workflows within SAP for internal clients, aimed at improving operational efficiency and ensuring that financial processes align with business requirements. Management of configurations, incident resolution, and support for continuous improvement of systems in the FI (Finance) module, with a particular focus on Record to Report (RTR) and Treasury and Risk Management (TRM) areas.',
        location: 'Mar del Plata, Buenos Aires Province, Argentina · Remote',
        type: 'experience',
        role: 'SAP Packaged App Development Analyst',
        company: 'Accenture'
    },
    {
        period: 'Oct. 2024 - Dec. 2024 · 3 months',
        description: 'Development of the course "Frontend Development with Angular, JavaScript, and Complementary Technologies", training students in the development of modern applications using Angular and related technologies. Design and execution of a curriculum that included topics such as component creation, directives, and services, data management with observables and RxJS, reactive form design and validation, and Angular routing.',
        location: 'Mar del Plata, Buenos Aires Province, Argentina · Remote',
        type: 'experience',
        role: 'Professor - Frontend Development with Angular, JavaScript, and Complementary Technologies',
        company: 'ATICMA'
    },
    {
        period: 'Feb. 2022 - Nov. 2023 · 1 year 10 months',
        description: 'Graduated with a Associate Degree in Programming, focusing on web development technologies such as C, Java, HTML, CSS, JavaScript, Angular, NodeJS, Firebase, etc. I also gained experience with database management (MySQL, PostgreSQL, Sequelize) and project management tools like Jira and Trello.',
        location: 'Argentina',
        type: 'education',
        degree: 'Associate Degree in Programming, Information Technology',
        institution: 'Universidad Tecnológica Nacional'
    },
    {
        period: 'Aug. 2023 - Dec. 2023 · 5 months',
        description: 'Completed a Full Stack web development course with a focus on JavaScript, NodeJS, and backend technologies, including ExpressJS, Sequelize, and MySQL. Projects included building dynamic web applications with the full stack.',
        location: 'Argentina',
        type: 'education',
        degree: 'Full Stack NodeJs- Web Development',
        institution: 'Agencia de aprendizaje a lo largo de la vida - Gobierno de la Ciudad de Buenos Aires'
    },
    {
        period: 'Jan. 2024 - Feb. 2024 · 2 months',
        description: 'Completed a Bootcamp in SAP FI-CO, focusing on the configuration and management of SAP financial modules for business processes.',
        location: 'Argentina',
        type: 'education',
        degree: 'Bootcamp SAP FI-CO',
        institution: 'Accenture'
    },
    {
        period: 'Mar. 2023 - May. 2024 · 1 year 3 months',
        description: 'Experience in creating modern web applications using Angular for the frontend and Node.js along with Express for the backend. Focus on scalable and efficient solutions, with emphasis on databases, authentication, and user experience improvements.',
        location: 'Remote',
        type: 'experience',
        role: 'Angular + NodeJs Application Developer',
        company: 'Self-employed'
    },
    {
        period: 'Jun. 2023 - Aug. 2023 · 3 months',
        description: 'Specialized in Python for Data Science, gaining experience with libraries such as Pandas, Scikit-learn, Numpy, Matplotlib, and Seaborn for data analysis.',
        location: 'Argentina',
        type: 'education',
        degree: 'Python for Data Science',
        institution: 'Alura'
    },
    {
        period: 'Mar. 2023 - Jul. 2023 · 5 months',
        description: 'Development of web applications using Python + Django. Use of technologies like Bootstrap to improve user experience and tools like Pillow, pydantic, and sqlparse to enhance project efficiency and security.',
        location: 'Remote',
        type: 'experience',
        role: 'Python + Django Application Developer',
        company: 'Self-employed'
    },
    {
        period: 'Oct. 2022 - Jun. 2023 · 9 months',
        description: 'Development of applications in Java and JavaFX, using design patterns like MVC to improve code maintainability. Implementation of user authentication, password encryption, and graphical interface optimization with JavaFX.',
        location: 'Remote',
        type: 'experience',
        role: 'Java + JavaFX Application Developer',
        company: 'Self-employed'
    },
    {
      period: 'Nov. 2022 - May. 2023 · 7 months',
      description: 'Intensive training in Backend development, including languages like Java and programming fundamentals. Deepened knowledge of Git and GitHub for version control and project collaboration. Covered basic Front End concepts like HTML, CSS and JavaScript for a comprehensive understanding of web development, and database management with MySQL.',
      location: 'Argentina',
      type: 'education',
      degree: 'Jr. Back End Developer, Computer Programming',
      institution: 'Alura',
  },
    {
        period: 'Jan. 2023 - Apr. 2023 · 4 months',
        description: 'Account Executive for the Claro Empresas sector. Sales and consulting on technological services such as cloud storage, virtual servers, virtual networks, IoT technology, and collaborative and management tools.',
        location: 'Mar del Plata, Buenos Aires Province, Argentina · On-site',
        type: 'experience',
        role: 'Account Executive',
        company: 'Claro Argentina'
    },
    {
        period: 'Mar. 2023 - Jun. 2023 · 4 months',
        description: 'Specialized in Django, working with Python and MySQL. This course deepened my skills in backend development and web frameworks.',
        location: 'Argentina',
        type: 'education',
        degree: 'Specialization in Django',
        institution: 'Agencia de Aprendizaje a lo largo de la vida - Gobierno de la Ciudad de Buenos Aires'
    },
    {
        period: 'Jan. 2023 - Mar. 2023 · 3 months',
        description: 'Completed an academic update on the use of digital ecosystems in educational settings, learning how to integrate technology in teaching.',
        location: 'Argentina',
        type: 'education',
        degree: 'Academic Update in Digital Ecosystems in School',
        institution: 'Universidad FASTA'
    },
    {
        period: 'Jul. 2015 - Dec. 2021 · 6 years 6 months',
        description: 'Earned a degree in History with a focus on teaching and humanities studies, gaining strong pedagogical and seminar facilitation skills.',
        location: 'Mar del Plata, Argentina',
        type: 'education',
        degree: 'History Degree',
        institution: 'Universidad Nacional de Mar del Plata'
    }
]


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
