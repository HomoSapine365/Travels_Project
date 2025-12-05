import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class Login {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    // Call login endpoint
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: async (res) => {
        try {
          // this will store token & user_id and notify app state
          if (res?.token && res?.user_id) {
            // Save token & user id and update currentUser if we have username/email
            this.auth.notifyLogin(res.token, res.user_id, res.username ?? undefined, res.email ?? null);

            // If backend returned username/email already, it navigate home
            if (res.username || res.email) {
              this.router.navigate(['/']);
              return;
            }

            try {
              const profile = await lastValueFrom(this.auth.fetchProfile(res.user_id));
              this.auth.notifyLogin(res.token, res.user_id, profile.username, profile.email ?? null);
            } catch (pfErr) {
              console.warn('Profile fetch after login failed', pfErr);
            }

            this.router.navigate(['/']);
            return;
          }

          alert('Login succeeded but server did not return token/user_id.');
        } catch (err) {
          console.error('Unexpected error during login handling', err);
          alert('Login handled with errors; check console.');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed: ' + (err?.error?.error || err?.statusText || 'Unknown'));
      }
    });
  }
}
