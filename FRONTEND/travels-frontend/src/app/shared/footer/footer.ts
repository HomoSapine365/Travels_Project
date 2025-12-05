import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <footer class="py-3 mt-4 border-top">
    <div class="container text-center text-muted">© Hell & Heaven Travels... All rights reserved.</div>
  </footer>
  `
})
export class Footer {}
