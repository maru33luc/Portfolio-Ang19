import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-branding">
          <h3>Marina Lucero</h3>
          <p>&copy; {{ currentYear }}. All rights reserved.</p>
          <p class="footer-tagline">Transforming ideas into stunning web experiences.</p>
        </div>
        <nav class="footer-nav">
          <h4>Quick Links</h4>
          <ul>
            <li><a routerLink="/about" routerLinkActive="active">About</a></li>
            <li><a routerLink="/projects" routerLinkActive="active">Portfolio</a></li>
            <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
          </ul>
        </nav>
        <div class="social-links">
          <h4>Follow Me</h4>
          <a href="https://github.com/maru33luc" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-github" id="github"></i>
          </a>
          <a href="https://www.linkedin.com/in/marina-lucero-022a4823b/" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-linkedin" id="linkedin"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-twitter" id="twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-instagram" id="instagram"></i>
          </a>

        </div>
      </div>
    </footer>
  `,
  styleUrl: "./footer.component.css",
})
export class FooterComponent implements OnInit {
  currentYear: number = 0;

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }
}
