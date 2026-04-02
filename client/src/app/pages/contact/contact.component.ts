import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  isSent = false;
  btnText = 'Send Message';
  btnBackground = '';

  constructor(private apiService: ApiService) {}

  onSubmit(form: any) {
    if (form.invalid) return;

    this.isSubmitting = true;
    this.btnText = 'Sending...';

    const payload = {
      name: `${this.formData.fname} ${this.formData.lname}`,
      email: this.formData.email,
      subject: this.formData.subject,
      message: this.formData.message
    };

    this.apiService.submitContact(payload).subscribe({
      next: (res) => {
        this.btnText = '✔ Message Sent!';
        this.isSent = true;
        this.btnBackground = '#2d6a4f';
        
        setTimeout(() => {
          this.btnText = 'Send Message';
          this.isSent = false;
          this.isSubmitting = false;
          this.btnBackground = '';
          form.resetForm();
        }, 3500);
      },
      error: (err) => {
        this.btnText = '✖ Error Sending';
        this.isSent = true;
        this.btnBackground = '#d00000';
        console.error(err);

        setTimeout(() => {
          this.btnText = 'Send Message';
          this.isSent = false;
          this.isSubmitting = false;
          this.btnBackground = '';
        }, 3500);
      }
    });
  }
}
