import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AppUser } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [CommonModule]
})
export class Profile implements OnInit {
  public currentUser$: Observable<AppUser | null>;

  constructor(public auth: AuthService, public router: Router) {
    this.currentUser$ = this.auth.currentUser$;
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logoutLocal();
    this.router.navigate(['/login']);
  }
}
