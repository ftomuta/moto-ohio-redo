import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  courses: any[] = [];

  constructor(private apiService: ApiService, private el: ElementRef) {}

  ngOnInit() {
    this.apiService.getCourses().subscribe(data => {
      // In the home view, we only show 3 courses.
      this.courses = data.slice(0, 3);
    });
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.animationPlayState = 'running';
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    this.el.nativeElement.querySelectorAll('.reveal').forEach((el: any) => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  }
}
