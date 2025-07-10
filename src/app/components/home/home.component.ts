import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ContactComponent } from '../contact/contact.component';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    ScrollAnimationDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
