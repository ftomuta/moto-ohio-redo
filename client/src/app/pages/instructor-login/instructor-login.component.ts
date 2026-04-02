import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-instructor-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './instructor-login.component.html',
  styleUrl: './instructor-login.component.css',
  encapsulation: ViewEncapsulation.None
})
export class InstructorLoginComponent {
  email = '';
  password = '';
  remember = false;
  errorMsg = '';
  isSubmitting = false;

  constructor(private apiService: ApiService, private router: Router) {
    if (sessionStorage.getItem('moto_instructor')) {
      this.router.navigate(['/instructor-dashboard']);
    }
  }

  onSubmit() {
    this.errorMsg = '';
    if (!this.email || !this.password) {
      this.errorMsg = 'Please enter your email and password.';
      return;
    }

    this.isSubmitting = true;

    this.apiService.login({ username: this.email, password: this.password }).subscribe({
      next: (res) => {
        if (res.success) {
          sessionStorage.setItem('moto_instructor', JSON.stringify({
            name: this.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            email: this.email,
            token: res.token,
            loginTime: Date.now()
          }));
          this.router.navigate(['/instructor-dashboard']);
        } else {
          this.errorMsg = res.error || 'Login failed.';
          this.isSubmitting = false;
        }
      },
      error: () => {
        this.errorMsg = 'Incorrect email or password. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  forgotPassword(event: Event) {
    event.preventDefault();
    alert('Password reset instructions will be sent to your registered email address. Please check your inbox.\n\n(In the live system, this sends a real reset email.)');
  }
}
