import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  project1Expanded = false;
  project2Expanded = false;
  project3Expanded = false;
  project4Expanded = false;

  toggleProject1() {
    this.project1Expanded = !this.project1Expanded;
  }

  toggleProject2() {
    this.project2Expanded = !this.project2Expanded;
  }

  toggleProject3() {
    this.project3Expanded = !this.project3Expanded;
  }

  toggleProject4() {
    this.project4Expanded = !this.project4Expanded;
  }
}
