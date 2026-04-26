import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from '../../../core/directives/tooltip.directive';

@Component({
  selector: 'app-book-layout',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    IconComponent, 
    CommonModule,
    TooltipDirective
  ],
  templateUrl: './book-layout.html',
  styleUrl: './book-layout.css',
})
export class BookLayout {
  isCollapsed = signal(false);

  menuItems = [
    { path: 'search', label: 'Search', icon: 'search.svg' },
    { path: 'loans', label: 'Loans', icon: 'book-open.svg' },
    { path: 'favorites', label: 'Favorites', icon: 'heart.svg' },
  ];

  toggleSidebar() {
    this.isCollapsed.update(v => !v);
  }
}