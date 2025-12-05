import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, AppUser } from '../../core/services/auth.service';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [CommonModule, RouterModule]
})
export class Header {
  public currentUser$: Observable<AppUser | null>;

  constructor(private router: Router, private auth: AuthService) {
    this.currentUser$ = this.auth.currentUser$;
  }

  logout() {
    this.auth.logoutLocal();
    this.router.navigate(['/login']);
  }
}
