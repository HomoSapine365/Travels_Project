import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bus { id: number; bus_name: string; number: string; origin: string; destination: string; start_time: string; reach_time: string; price: string; no_of_seats: number; }
export interface Seat { id: number; seat_number: string; is_booked: boolean; bus: number | Bus; }

const API = '/api';

@Injectable({ providedIn: 'root' })
export class BusesService {
  constructor(private http: HttpClient) {}

  getBuses(): Observable<Bus[]> { return this.http.get<Bus[]>(`${API}/buses/`); }
  getBus(id: number): Observable<Bus> { return this.http.get<Bus>(`${API}/buses/${id}/`); }
  getSeatsForBus(busId: number): Observable<Seat[]> { return this.http.get<Seat[]>(`${API}/seat/?bus=${busId}`); }

  bookSeats(payload: { seats: number[]; travel_date?: string }) {
    return this.http.post(`${API}/booking/`, payload);
  }
}
