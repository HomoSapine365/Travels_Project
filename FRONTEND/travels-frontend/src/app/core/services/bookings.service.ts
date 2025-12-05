import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingsService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  createBooking(payload: { seat: number; travel_date?: string }): Observable<any> {
    return this.http.post(`${this.api}/booking/`, payload);
  }

  getUserBookings(userId: number) {
    return this.http.get(`${this.api}/user/${userId}/bookings/`);
  }
}
