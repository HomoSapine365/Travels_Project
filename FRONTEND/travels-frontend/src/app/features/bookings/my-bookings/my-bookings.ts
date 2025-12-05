import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { BusesService } from '../../../core/services/buses.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.html',
  styleUrls: ['./my-bookings.css'],
  imports: [CommonModule]
})
export class MyBookings implements OnInit {
  bookings: any[] = [];
  loading = true;

  constructor(private auth: AuthService, private busesService: BusesService, private router: Router) {}

  ngOnInit(): void {
    const uid = Number(localStorage.getItem('user_id'));
    if (!uid) {
      this.router.navigate(['/login']);
      return;
    }

    this.auth.getUserBookings(uid).subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed loading bookings', err);
        this.loading = false;
      }
    });
  }

  cancel(id: number) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    this.busesService.cancelBooking(id).subscribe({
      next: () => {
        alert('Booking cancelled.');
        this.bookings = this.bookings.filter(b => b.id !== id);
      },
      error: (err) => {
        console.error('Cancel failed', err);
        const msg = err?.error?.detail || err?.statusText || 'Cancel Failed';
        alert('Cancel failed: ' + msg);
      }
    });
  }
}
