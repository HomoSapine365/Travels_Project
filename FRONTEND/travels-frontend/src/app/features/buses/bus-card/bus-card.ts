import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bus } from '../../../core/models/bus.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-bus-card',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './bus-card.html',
  styleUrls: ['./bus-card.css']
})
export class BusCard {
  @Input() bus!: Bus;
  @Output() view = new EventEmitter<number>();

  onView() {
    if (this.bus?.id) this.view.emit(this.bus.id);
  }

  get featuresArray(): string[] {
    const f = this.bus?.features;
    if (!f) return [];
    if (Array.isArray(f)) return f;
    return (f as string).split(',').map(s => s.trim()).filter(Boolean);
  }
}
