import { Component } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
