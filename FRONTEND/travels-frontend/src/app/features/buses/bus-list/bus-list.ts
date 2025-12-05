import { Component, OnInit } from '@angular/core';
import { BusesService } from '../../../core/services/buses.service';
import { Bus } from '../../../core/models/bus.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BusCard } from '../bus-card/bus-card';

@Component({
  standalone: true,
  selector: 'app-bus-list',
  imports: [CommonModule, FormsModule, BusCard, RouterModule],
  templateUrl: './bus-list.html',
  styleUrls: ['./bus-list.css']
})
export class BusList implements OnInit {
  buses: Bus[] = [];
  filteredBuses: Bus[] = [];
  searchText = '';
  selectedOrigin = '';
  selectedDestination = '';
  origins: string[] = [];
  destinations: string[] = [];

  constructor(private busesService: BusesService, private router: Router) {}

  ngOnInit(): void {
    this.busesService.getBuses().subscribe({
      next: (data) => {
        this.buses = data;
        this.filteredBuses = [...data];
        this.origins = Array.from(new Set(data.map(b => (b.origin || '').toString())));
        this.destinations = Array.from(new Set(data.map(b => (b.destination || '').toString())));
      },
      error: (err) => {
        console.error('Failed to load buses', err);
      }
    });
  }

  applyFilters(): void {
    const s = (this.searchText || '').toLowerCase();
    this.filteredBuses = this.buses.filter(b =>
      ((b.bus_name || '').toLowerCase().includes(s) || (b.number || '').toLowerCase().includes(s)) &&
      (!this.selectedOrigin || b.origin === this.selectedOrigin) &&
      (!this.selectedDestination || b.destination === this.selectedDestination)
    );
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedOrigin = '';
    this.selectedDestination = '';
    this.filteredBuses = [...this.buses];
  }

  goToBus(busId: number) {
    this.router.navigate(['/buses', busId]);
  }
}
