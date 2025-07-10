import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-about',
  imports: [ScrollAnimationDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
