import { Component, inject } from '@angular/core';
import { FavoriteService } from '../../../core/services/favorites.service';
import { CardComponent } from '../../../shared/components/card/card';
import { CommonModule } from '@angular/common';
import { CoverFallbackPipe } from '../../../shared/pipes/cover-fallback-pipe-pipe';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CardComponent, CoverFallbackPipe],
  template: `
    <section class="p-8 max-w-7xl mx-auto">
      <h1 class="text-4xl font-serif font-bold text-primary mb-10">Your <span class="text-accent">Library</span></h1>
      
      @if (favService.favorites().length > 0) {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (book of favService.favorites(); track book.key) {
            <app-card [titleId]="'title-' + book.key">
              <div card-header class="aspect-3/4 rounded-xl overflow-hidden">
                <img [src]="book.cover_i | coverFallbackPipe:'M'" class="w-full h-full object-cover">
              </div>
              <div card-body>
                <h3 class="font-bold truncate">{{ book.title }}</h3>
              </div>
            </app-card>
          }
        </div>
      } @else {
        <div class="text-center py-20 italic text-primary/40">
          Your collection is empty. Start exploring the hub!
        </div>
      }
    </section>
  `
})
export class FavoritePage {
  favService = inject(FavoriteService);
}