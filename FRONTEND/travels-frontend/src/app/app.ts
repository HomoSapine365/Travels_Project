import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [CommonModule, RouterOutlet, Header, Footer]
})
export class AppComponent {}
