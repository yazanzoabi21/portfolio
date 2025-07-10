import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-contact',
  imports: [ScrollAnimationDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  copyEmail() {
    const email = 'zohbiyazan@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      alert('Email copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy email: ', err);
    });
  }

  copyPhone() {
    const phone = '+96176557980';
    navigator.clipboard.writeText(phone).then(() => {
      alert('Phone number copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy phone number: ', err);
    });
  }
}
