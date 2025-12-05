import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusesService } from '../../../core/services/buses.service';
import { Bus, Seat } from '../../../core/models/bus.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-bus-detail',
  templateUrl: './bus-detail.html',
  styleUrls: ['./bus-detail.css'],
  imports: [CommonModule, FormsModule]
})
export class BusDetail implements OnInit {
  busId!: number;
  bus: Bus | null = null;
  seats: Seat[] = [];
  selectedSeats: number[] = [];
  travelDate: string | null = null; 
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busesService: BusesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;
      this.busId = Number(id);
      this.loadBusAndSeats();
    });
  }

  loadBusAndSeats() {
    this.loading = true;
    this.busesService.getBus(this.busId).subscribe({
      next: data => this.bus = data,
      error: err => console.error('Failed to load bus', err)
    });

    this.busesService.getSeatsForBus(this.busId).subscribe({
      next: s => {
        // sort seat_number numerically like ascending order (S1, S2... S10)
        this.seats = s.sort((a,b) => {
          const na = Number(a.seat_number.replace(/\D/g,'')) || 0;
          const nb = Number(b.seat_number.replace(/\D/g,'')) || 0;
          return na - nb;
        });
        this.loading = false;
      },
      error: err => {
        console.error('Failed loading seats', err);
        this.loading = false;
      }
    });
  }


  get features(): string[] {
    const f = this.bus?.features;
    if (!f) return [];
    if (Array.isArray(f)) return f;
    return (f as string).split(',').map(s => s.trim()).filter(Boolean);
  }
  

  isSelected(s: Seat) {
    return this.selectedSeats.includes(s.id);
  }

  toggleSeatSelection(s: Seat) {
    if (s.is_booked) return; 
    // cannot select booked ones
    const idx = this.selectedSeats.indexOf(s.id);
    if (idx === -1) this.selectedSeats.push(s.id);
    else this.selectedSeats.splice(idx, 1);
  }

  // if user logged in or not??
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // proceed to payment one by one flow in steps...
  async proceedToPayment() {
    // 1) login guard
    if (!this.isLoggedIn()) {
      alert('Please login to book a ticket.');
      this.router.navigate(['/login']);
      return;
    }

    // 2) must select at least one seat
    if (this.selectedSeats.length === 0) {
      alert('Select at least one seat first.');
      return;
    }

    // 3) must select travel date
    if (!this.travelDate) {
      alert('Please select a travel date before booking.');
      return;
    }

    // Prepare payloads
    const successfulBookings: number[] = [];
    try {
      for (const seatId of this.selectedSeats) {
        const payload = { seat: seatId, travel_date: this.travelDate };
        await lastValueFrom(
          this.busesService.bookSeat(payload.seat, payload.travel_date)
        );
        successfulBookings.push(seatId);
      }

      alert(`Booking successful (${successfulBookings.length} seat(s)).`);
      // optionally clear selections and navigate to My Bookings
      this.selectedSeats = [];
      this.router.navigate(['/my-bookings']);
    } catch (err: any) {
      console.error('Booking failed', err);

      // handle unauthorized explicitly
      if (err?.status === 401) {
        alert('Please login to book a ticket.');
        this.router.navigate(['/login']);
        return;
      }

      // If some seats booked & some failed, mention partial result
      const msg = err?.error?.error || err?.statusText || 'Booking failed';
      if (successfulBookings.length > 0) {
        alert(`Some bookings succeeded (${successfulBookings.length}), but an error occurred: ${msg}`);
        this.router.navigate(['/my-bookings']);
      } else {
        alert('Booking failed: ' + msg);
      }
    }
  }
}
