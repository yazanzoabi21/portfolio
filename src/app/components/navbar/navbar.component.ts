import { Component, OnInit, OnDestroy, EventEmitter, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() navigateTo = new EventEmitter<string>();
  
  isSidebarOpen = false;
  
  isDarkMode = false;

  activeSection: string = 'home';

  private themeSubscription: Subscription = new Subscription();

  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit() {
    this.themeSubscription = this.themeService.darkMode$.subscribe(
      isDark => this.isDarkMode = isDark
    );
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.closeSidebar();
    }
  }

  onNavClick(section: string) {
    this.navigateTo.emit(section);
    this.closeSidebar();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          this.activeSection = section;
          break;
        }
      }
    }
  }
}
