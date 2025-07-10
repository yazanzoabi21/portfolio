import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-contact',
  imports: [ScrollAnimationDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private showToast(message: string) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-700 text-white px-4 py-2 rounded-xl shadow-lg';
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('opacity-0');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }

  copyEmail() {
    const email = 'zohbiyazan@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      this.showToast('Email copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy email: ', err);
    });
  }

  copyPhone() {
    const phone = '+96176557980';
    navigator.clipboard.writeText(phone).then(() => {
      this.showToast('Phone number copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy phone number: ', err);
    });
  }

}
