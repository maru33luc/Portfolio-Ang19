import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
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
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </nav>
        <div class="social-links">
          <h4>Follow Me</h4>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-github" id="github"></i>
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-linkedin" id="linkedin"></i>
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-twitter" id="twitter"></i>
          </a>
          <a href="https://instagram" target="_blank" rel="noopener noreferrer">
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
