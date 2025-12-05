import { Routes } from '@angular/router';
import { BusList } from './features/buses/bus-list/bus-list';
import { BusDetail } from './features/buses/bus-detail/bus-detail';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { MyBookings } from './features/bookings/my-bookings/my-bookings';
import { Profile } from './features/auth/profile/profile';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: BusList },
  { path: 'buses/:id', component: BusDetail },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'my-bookings', component: MyBookings, canActivate: [authGuard] }, 
  { path: 'profile', component: Profile, canActivate: [authGuard] }        
];
