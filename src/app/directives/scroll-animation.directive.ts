import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  @Input() animationType: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'zoomIn' = 'fadeInUp';
  @Input() animationDelay: number = 0;
  @Input() animationDuration: number = 800;
  @Input() repeatAnimation: boolean = true; // Allow animation to repeat
  @Input() resetOnExit: boolean = true; // Reset animation when element exits viewport

  private observer!: IntersectionObserver;
  private animationTimeout?: number;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.setupInitialState();
    this.createObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }

  private setupInitialState() {
    // Add base animation class
    this.renderer.addClass(this.el.nativeElement, 'scroll-animation');
    this.renderer.addClass(this.el.nativeElement, `animation-${this.animationType}`);
    
    // Set custom properties
    this.renderer.setStyle(this.el.nativeElement, '--animation-delay', `${this.animationDelay}ms`);
    this.renderer.setStyle(this.el.nativeElement, '--animation-duration', `${this.animationDuration}ms`);
  }

  private createObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Clear any existing timeout
          if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
          }
          
          // Trigger animation with delay
          this.animationTimeout = window.setTimeout(() => {
            this.renderer.addClass(entry.target, 'animate');
          }, this.animationDelay);
          
          // Don't disconnect if we want to repeat animations
          if (!this.repeatAnimation) {
            this.observer.unobserve(entry.target);
          }
        } else if (this.resetOnExit && this.repeatAnimation) {
          // Reset animation when element exits viewport
          this.renderer.removeClass(entry.target, 'animate');
          if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
          }
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  // Public method to manually trigger animation
  public triggerAnimation() {
    this.renderer.removeClass(this.el.nativeElement, 'animate');
    // Force reflow to ensure the class removal takes effect
    this.el.nativeElement.offsetHeight;
    
    setTimeout(() => {
      this.renderer.addClass(this.el.nativeElement, 'animate');
    }, this.animationDelay);
  }

  // Public method to reset animation
  public resetAnimation() {
    this.renderer.removeClass(this.el.nativeElement, 'animate');
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }
}
