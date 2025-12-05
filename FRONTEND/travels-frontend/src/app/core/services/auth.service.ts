import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../config/api.config';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, take } from 'rxjs/operators';

export interface AppUser {
  id: number;
  username?: string | null;
  email?: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _currentUser = new BehaviorSubject<AppUser | null>(null);
  public currentUser$ = this._currentUser.asObservable();

  constructor(private http: HttpClient) {
    this.restoreSession();
  }

  login(payload: {
    username: string;
    password: string;
  }): Observable<{ token: string; user_id: number; username?: string; email?: string }> {
    return this.http
      .post<{ token: string; user_id: number; username?: string; email?: string }>(
        `${API_BASE}/login/`,
        payload
      )
      .pipe(
        tap((res) => {
          if (res?.token) localStorage.setItem('token', res.token);
          if (res?.user_id) localStorage.setItem('user_id', String(res.user_id));

          if (res.username) localStorage.setItem('username', res.username);
          if (res.email) localStorage.setItem('email', res.email);

          if (res.username || res.email) {
            const user: AppUser = {
              id: res.user_id,
              username: res.username ?? null,
              email: res.email ?? null
            };
            this._currentUser.next(user);
          } else {
            const uid = res.user_id;
            const minimalUser: AppUser = { id: uid, username: null, email: null };
            this._currentUser.next(minimalUser);

            this.fetchProfileSafe(uid).subscribe({
              next: (user) => {
                this._currentUser.next(user);
                if (user.username) localStorage.setItem('username', user.username);
                if (user.email) localStorage.setItem('email', user.email);
              },
              error: (err) => {
                console.warn('Profile fetch failed after login, keeping minimal user.', err);
              }
            });
          }
        })
      );
  }

  register(payload: { username: string; password: string; email?: string }): Observable<any> {
    return this.http.post(`${API_BASE}/register/`, payload);
  }

  fetchProfile(userId: number): Observable<AppUser> {
    return this.http.get<AppUser>(`${API_BASE}/user/${userId}/`);
  }

  private fetchProfileSafe(userId: number): Observable<AppUser> {
    return this.fetchProfile(userId).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getUserBookings(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${API_BASE}/user/${userId}/bookings/`);
  }

  cancelBooking(bookingId: number) {
    return this.http.delete(`${API_BASE}/booking/${bookingId}/`);
  }

  notifyLogin(token: string, userId: number, username?: string | null, email?: string | null) {
    if (token) localStorage.setItem('token', token);
    if (userId) localStorage.setItem('user_id', String(userId));
    if (username) localStorage.setItem('username', username);
    if (email) localStorage.setItem('email', email);

    this._currentUser.next({
      id: userId,
      username: username ?? null,
      email: email ?? null
    });
  }

  logoutLocal() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    this._currentUser.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): number | null {
    const v = localStorage.getItem('user_id');
    return v ? Number(v) : null;
  }

  private restoreSession(): void {
    const token = localStorage.getItem('token');
    const uidStr = localStorage.getItem('user_id');

    if (!token || !uidStr) {
      this._currentUser.next(null);
      return;
    }

    const uid = Number(uidStr);
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');

    if (storedUsername || storedEmail) {
      const cachedUser: AppUser = {
        id: uid,
        username: storedUsername ?? null,
        email: storedEmail ?? null
      };
      this._currentUser.next(cachedUser);

      this.fetchProfile(uid)
        .pipe(take(1))
        .subscribe({
          next: (user) => {
            this._currentUser.next(user);
            if (user.username) localStorage.setItem('username', user.username);
            if (user.email) localStorage.setItem('email', user.email ?? '');
          },
          error: (err) => {
            console.warn('Profile refresh failed during restoreSession, keeping cached user.', err);
          }
        });
    } else {
      const minimalUser: AppUser = { id: uid, username: null, email: null };
      this._currentUser.next(minimalUser);

      this.fetchProfile(uid)
        .pipe(take(1))
        .subscribe({
          next: (user) => {
            this._currentUser.next(user);
            if (user.username) localStorage.setItem('username', user.username);
            if (user.email) localStorage.setItem('email', user.email ?? '');
          },
          error: (err) => {
            console.warn('Failed to restore session profile, keeping minimal user.', err);
          }
        });
    }
  }
}
