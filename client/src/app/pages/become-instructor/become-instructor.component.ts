import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-become-instructor',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './become-instructor.component.html',
  styleUrl: './become-instructor.component.css'
})
export class BecomeInstructorComponent {
  activeFaqIndex: number | null = null;

  toggleFaq(index: number) {
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }
}
