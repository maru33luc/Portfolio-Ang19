import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="contact-section container fade-in">
      <h1>Get In Touch</h1>

      <div class="contact-container">
        <div class="contact-info">
          <div class="info-card">
            <i class="fas fa-envelope"></i>
            <h3>Email</h3>
            <p>your.email&#64;example.com</p>
          </div>

          <div class="info-card">
            <i class="fa fa-map-marker"></i>
            <h3>Location</h3>
            <p>City, Country</p>
          </div>

          <div class="info-card">
            <i class="fas fa-phone"></i>
            <h3>Phone</h3>
            <p>+1 234 567 890</p>
          </div>
        </div>

        <form
          [formGroup]="contactForm"
          (ngSubmit)="onSubmit()"
          class="contact-form"
        >
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              formControlName="name"
              [class.error]="isFieldInvalid('name')"
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              [class.error]="isFieldInvalid('email')"
            />
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              formControlName="message"
              rows="5"
              [class.error]="isFieldInvalid('message')"
            ></textarea>
          </div>

          <button
            type="submit"
            class="submit-btn"
            [disabled]="contactForm.invalid || isSubmitting"
          >
            <span *ngIf="!isSubmitting">Send Message</span>
            <span *ngIf="isSubmitting">Sending...</span>
          </button>

          <div
            *ngIf="submitStatus"
            class="submit-status"
            [class.success]="submitStatus === 'success'"
          >
            {{
              submitStatus === 'success'
                ? 'Message sent successfully!'
                : 'Failed to send message. Please try again.'
            }}
          </div>
        </form>
      </div>
    </section>
  `,
  styles: [
    `
      .contact-section {
        padding: 5rem 0;
        margin: 0 40px; 
      }

      .contact-container {
        max-width: 1000px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 2rem;
        padding: 0 20px; 
      }

      .contact-info {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .info-card {
        background: var(--card-background);
        padding: 1.5rem;
        border-radius: 1rem;
        text-align: center;
        box-shadow: 0 4px 6px var(--shadow-color);
        transition: transform 0.3s;
      }

      .info-card:hover {
        transform: translateY(-5px);
      }

      .info-card i {
        font-size: 2rem;
        color: var(--primary-color);
        margin-bottom: 1rem;
      }

      .info-card h3 {
        color: var(--text-color);
        margin-bottom: 0.5rem;
      }

      .info-card p {
        color: var(--text-color);
        opacity: 0.8;
      }

      .contact-form {
        background: var(--card-background);
        padding: 1rem 2rem;
        border-radius: 1rem;
        box-shadow: 0 4px 6px var(--shadow-color);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--text-color);
      }

      input,
      textarea {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid var(--border-color);
        border-radius: 0.5rem;
        background: var(--background-color);
        color: var(--text-color);
        transition: border-color 0.3s;
        box-sizing: border-box;
      }

      input:focus,
      textarea:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      input.error,
      textarea.error {
        border-color: #ef4444;
      }

      .submit-btn {
        width: 100%;
        padding: 1rem;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-weight: 500;
        cursor: pointer;
        transition: transform 0.3s, box-shadow 0.3s;
      }

      .submit-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px var(--shadow-color);
      }

      .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .submit-status {
        margin-top: 1rem;
        padding: 0.75rem;
        border-radius: 0.5rem;
        text-align: center;
        background: #ef4444;
        color: white;
      }

      .submit-status.success {
        background: #10b981;
      }

      textarea {
        height: 33vh;
      }

      @media (max-width: 768px) {
        .contact-container {
          grid-template-columns: 1fr;
        }

        .contact-info {
          flex-direction: row;
          flex-wrap: wrap;
        }

        .info-card {
          flex: 1;
          min-width: 200px;
        }
      }
    `,
  ],
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitStatus: 'success' | 'error' | null = null;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  async onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitStatus = null;

      try {
      } catch (error) {
        this.submitStatus = 'error';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
