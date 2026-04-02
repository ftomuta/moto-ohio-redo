import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorDashboardComponent implements OnInit {
  userData: any = null;
  firstName = '';
  initials = '';
  todayStr = '';
  
  activePanel = 'overview';
  activeClassFilter = 'all';
  activeClassLabel = 'All Students';
  expandedStudentId: number | null = null;
  savingStudentId: number | null = null;
  saveButtonText = 'Save Record Update';
  saveButtonSuccess = false;

  studentData: { [key: string]: any[] } = {
    'brc-col': [
        { id: 1, name: 'Amanda Johnson', age: 24, gender: 'Female', waiver: true, licenseType: 'Driver License', licenseNum: 'OH1234567', permit: false, guardian: false, homework: 95, ridingExam: 'pass', incident: '' },
        { id: 2, name: 'Brian Kim', age: 31, gender: 'Male', waiver: true, licenseType: 'Learner Permit', licenseNum: 'OH9876543', permit: true, guardian: false, homework: 88, ridingExam: 'pass', incident: '' },
        { id: 3, name: 'Carlos Lopez', age: 19, gender: 'Male', waiver: false, licenseType: 'Driver License', licenseNum: 'OH1122334', permit: false, guardian: false, homework: 0, ridingExam: 'pending', incident: '' },
        { id: 11, name: 'Sarah Miller', age: 17, gender: 'Female', waiver: true, licenseType: 'Learner Permit', licenseNum: 'OH5566778', permit: true, guardian: true, homework: 92, ridingExam: 'pending', incident: '' }
    ],
    'arc-kir': [
        { id: 4, name: 'Frank Reynolds', age: 55, gender: 'Male', waiver: true, licenseType: 'M-Endorsement', licenseNum: 'OH4455667', permit: false, guardian: false, homework: 100, ridingExam: 'pass', incident: '' },
        { id: 5, name: 'Grace Nguyen', age: 28, gender: 'Female', waiver: true, licenseType: 'M-Endorsement', licenseNum: 'OH7788990', permit: false, guardian: false, homework: 98, ridingExam: 'pass', incident: '' }
    ]
  };

  displayedStudents: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const data = sessionStorage.getItem('moto_instructor');
    if (!data) {
      this.router.navigate(['/instructor-login']);
      return;
    }

    this.userData = JSON.parse(data);
    this.firstName = this.userData.name.split(' ')[0];
    this.initials = this.userData.name.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase();

    const today = new Date();
    this.todayStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

    this.renderStudents('all');
  }

  logout() {
    sessionStorage.removeItem('moto_instructor');
    this.router.navigate(['/instructor-login']);
  }

  switchPanel(panel: string) {
    this.activePanel = panel;
  }

  getAvatarInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }

  renderStudents(classId: string) {
    if (classId === 'all') {
      this.activeClassLabel = 'All Students';
      this.displayedStudents = [];
      Object.values(this.studentData).forEach(arr => {
        this.displayedStudents.push(...arr);
      });
    } else {
      const select = document.getElementById('stu-class-filter') as HTMLSelectElement;
      if (select) {
        const option = select.options[select.selectedIndex];
        this.activeClassLabel = option ? option.text : 'Class Roster';
      }
      this.displayedStudents = this.studentData[classId] || [];
    }
  }

  onClassFilterChange(event: any) {
    const val = event.target.value;
    this.activeClassFilter = val;
    this.renderStudents(val);
  }

  viewClassStudents(classId: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.switchPanel('students');
    this.activeClassFilter = classId;
    // Set timeout to allow UI update before getting select element
    setTimeout(() => {
        const select = document.getElementById('stu-class-filter') as HTMLSelectElement;
        if(select) select.value = classId;
        this.renderStudents(classId);
    }, 0);
  }

  toggleStudent(id: number) {
    if (this.expandedStudentId === id) {
      this.expandedStudentId = null;
    } else {
      this.expandedStudentId = id;
    }
  }

  saveStudent(student: any) {
    this.savingStudentId = student.id;
    this.saveButtonText = '💾 Saving...';
    
    setTimeout(() => {
      this.saveButtonText = '✅ Saved';
      this.saveButtonSuccess = true;
      setTimeout(() => {
        this.saveButtonText = 'Save Record Update';
        this.saveButtonSuccess = false;
        this.savingStudentId = null;
        this.toggleStudent(student.id);
      }, 1500);
    }, 1000);
  }

  showAlert(msg: string) {
    alert(msg);
  }
}
