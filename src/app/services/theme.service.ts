import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  public darkMode$ = this.darkModeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeTheme();
  }

  private initializeTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
      this.setDarkMode(isDarkMode);
    }
  }

  toggleDarkMode() {
    const newMode = !this.darkModeSubject.value;
    this.setDarkMode(newMode);
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
    }
  }

  private setDarkMode(isDarkMode: boolean) {
    this.darkModeSubject.next(isDarkMode);
    
    if (isPlatformBrowser(this.platformId)) {
      const htmlElement = document.documentElement;
      if (isDarkMode) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
  }

  get isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}
