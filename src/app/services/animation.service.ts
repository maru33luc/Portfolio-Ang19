import { Injectable, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  initialize(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (isPlatformBrowser(this.platformId)) {
        // Delay initialization to ensure document is ready
        setTimeout(() => {
          this.ngZone.runOutsideAngular(() => {
            console.log('GSAP initialized');
          });
          resolve();
        }, 0);
      } else {
        resolve();
      }
    });
  }

  // Animar el texto del hero
  animateHeroText(element: Element | null): void {
    if (!isPlatformBrowser(this.platformId) || !element) return;

    this.ngZone.runOutsideAngular(() => {
      try {
        gsap.from(element.querySelectorAll('.animate-text'), {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        });
      } catch (error) {
        console.warn('Error al animar el texto del hero:', error);
      }
    });
  }

  // Animar la navbar
  animateNavbar(element: Element | null): void {
    if (!isPlatformBrowser(this.platformId) || !element) return;

    this.ngZone.runOutsideAngular(() => {
      try {
        gsap.from(element, {
          y: -100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      } catch (error) {
        console.warn('Error al animar la navbar:', error);
      }
    });
  }

  // Animación al pasar el mouse sobre un proyecto
  animateProjectHover(element: Element | null): void {
    if (!isPlatformBrowser(this.platformId) || !element) return;

    this.ngZone.runOutsideAngular(() => {
      try {
        gsap.to(element, {
          y: -10,
          duration: 0.3,
          ease: 'power2.out',
        });
      } catch (error) {
        console.warn('Error al animar hover del proyecto:', error);
      }
    });
  }

  // Animación al salir del hover
  animateProjectHoverExit(element: Element | null): void {
    if (!isPlatformBrowser(this.platformId) || !element) return;

    this.ngZone.runOutsideAngular(() => {
      try {
        gsap.to(element, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      } catch (error) {
        console.warn('Error al animar salida de hover del proyecto:', error);
      }
    });
  }

  // Animación de las barras de habilidades
  animateSkillBar(element: Element | null, percentage: number): void {
    if (!isPlatformBrowser(this.platformId) || !element) return;

    this.ngZone.runOutsideAngular(() => {
      try {
        gsap.to(element, {
          width: `${percentage}%`,
          duration: 1.5,
          ease: 'power3.out',
        });
      } catch (error) {
        console.warn('Error al animar barra de habilidades:', error);
      }
    });
  }

  // Transición entre páginas
  animatePageTransition(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      try {
        const tl = gsap.timeline();
        tl.to('.page-transition', {
          scaleY: 1,
          transformOrigin: 'bottom',
          duration: 0.5,
          ease: 'power3.inOut',
        }).to('.page-transition', {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 0.5,
          delay: 0.1,
          ease: 'power3.inOut',
        });
      } catch (error) {
        console.warn('Error al animar transición de página:', error);
      }
    });
  }
}

export function initializeAnimationService(
  animationService: AnimationService
): () => Promise<void> {
  return () => animationService.initialize();
}
