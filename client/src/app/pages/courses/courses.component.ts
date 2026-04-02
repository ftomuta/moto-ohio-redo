import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getCourses().subscribe(data => {
      this.courses = data;
      // Note: The UI originally hardcoded 6 courses, we have 3 seeded from the plan.
      // It's perfectly fine to display what's in the DB.  If we needed all 6 we'd add them to seed.
    });
  }
}
