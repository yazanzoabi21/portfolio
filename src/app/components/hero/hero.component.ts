import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-hero',
  imports: [ScrollAnimationDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

}
