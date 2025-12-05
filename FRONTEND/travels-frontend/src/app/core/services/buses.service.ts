import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../config/api.config';
import { Bus, Seat } from '../models/bus.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BusesService {
  private api = 'http://127.0.0.1:8000/api'

  constructor(private http: HttpClient) {}

  // list all buses
  getBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(`${this.api}/buses/`);
  }

  // get a single bus by id
  getBus(id: number): Observable<Bus> {
    return this.http.get<Bus>(`${this.api}/buses/${id}/`);
  }

  // get seats for a specific bus (it should matches Django path: /api/buses/<id>/seats/)
  getSeatsForBus(busId: number): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.api}/buses/${busId}/seats/`);
  }

  // single seat booking
  bookSeat(seatId: number, travel_date?: string) {
    const payload: any = { seat: seatId };
    if (travel_date) payload.travel_date = travel_date;
    return this.http.post(`${this.api}/booking/`, payload);
  }

  // cancel booking
  cancelBooking(bookingId: number) {
    return this.http.delete(`${this.api}/booking/${bookingId}/`);
  }
}
