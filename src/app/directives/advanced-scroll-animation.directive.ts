import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appAdvancedScrollAnimation]',
  standalone: true
})
export class AdvancedScrollAnimationDirective implements OnInit, OnDestroy {
  @Input() animationType: string = 'fadeInUp';
  @Input() animationDelay: number = 0;
  @Input() animationDuration: number = 800;
  @Input() threshold: number = 0.1;

  private observer!: IntersectionObserver;
  private hasAnimated = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.setupElement();
    this.createObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupElement() {
    const element = this.el.nativeElement;
    
    // Add animation classes
    element.classList.add('scroll-animation', `animation-${this.animationType}`);
    
    // Set CSS custom properties
    element.style.setProperty('--animation-delay', `${this.animationDelay}ms`);
    element.style.setProperty('--animation-duration', `${this.animationDuration}ms`);
    
    // Add data attributes for potential future use
    element.setAttribute('data-animation', this.animationType);
    element.setAttribute('data-delay', this.animationDelay.toString());
  }

  private createObserver() {
    const options: IntersectionObserverInit = {
      threshold: this.threshold,
      rootMargin: '0px 0px -30px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.triggerAnimation(entry.target as HTMLElement);
          this.hasAnimated = true;
          // Disconnect after animation for performance
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  private triggerAnimation(element: HTMLElement) {
    setTimeout(() => {
      element.classList.add('animate');
      
      // Dispatch custom event for any listeners
      element.dispatchEvent(new CustomEvent('animationTriggered', {
        detail: { animationType: this.animationType }
      }));
    }, this.animationDelay);
  }
}
