import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'courses', loadComponent: () => import('./pages/courses/courses.component').then(m => m.CoursesComponent) },
  { path: 'become-instructor', loadComponent: () => import('./pages/become-instructor/become-instructor.component').then(m => m.BecomeInstructorComponent) },
  { path: 'resources', loadComponent: () => import('./pages/resources/resources.component').then(m => m.ResourcesComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'instructor-login', loadComponent: () => import('./pages/instructor-login/instructor-login.component').then(m => m.InstructorLoginComponent) },
  { path: 'instructor-dashboard', loadComponent: () => import('./pages/instructor-dashboard/instructor-dashboard.component').then(m => m.InstructorDashboardComponent) },
  { path: '**', redirectTo: '' }
];
