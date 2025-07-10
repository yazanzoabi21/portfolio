import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private animatedElements = new Set<Element>();

  constructor() {
    this.observeElements();
  }

  private observeElements() {
    // Create a more advanced observer with better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
            this.triggerAnimation(entry.target);
            this.animatedElements.add(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observer elements with data-animate attribute
    setTimeout(() => {
      const elements = document.querySelectorAll('[data-animate]');
      elements.forEach(el => observer.observe(el));
    }, 100);
  }

  private triggerAnimation(element: Element) {
    const animationType = element.getAttribute('data-animate');
    const delay = element.getAttribute('data-delay') || '0';
    
    setTimeout(() => {
      element.classList.add('animate');
    }, parseInt(delay));
  }

  // Method to manually trigger animations
  triggerElementAnimation(element: Element, delay: number = 0) {
    setTimeout(() => {
      element.classList.add('animate');
    }, delay);
  }

  // Stagger animations for lists
  staggerAnimations(elements: NodeList, staggerDelay: number = 100) {
    elements.forEach((el, index) => {
      const delay = index * staggerDelay;
      this.triggerElementAnimation(el as Element, delay);
    });
  }
}
