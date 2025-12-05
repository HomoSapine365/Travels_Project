import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class Register {
  username = '';
  password = '';
  email = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.auth.register({ username: this.username, password: this.password, email: this.email }).subscribe({
      next: (res) => {
        if (res?.token) localStorage.setItem('token', res.token);
        if (res?.user_id) localStorage.setItem('user_id', String(res.user_id));
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Register failed', err);
        alert('Register failed: ' + (err?.error?.error || err?.statusText || 'Unknown'));
      }
    });
  }
}
