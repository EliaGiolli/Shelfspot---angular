import { Injectable, signal } from "@angular/core";
import { ApiBookData } from "../../shared/types/api-book-data";

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  // Signal privato per gestire lo stato interno
  private favoritesSignal = signal<ApiBookData[]>(this.loadFromStorage());

  // Signal pubblico di sola lettura per i componenti
  favorites = this.favoritesSignal.asReadonly();

  toggleFavorite(book: ApiBookData) {
    this.favoritesSignal.update(list => {
      const exists = list.find(b => b.key === book.key);
      const newList = exists ? list.filter(b => b.key !== book.key) : [...list, book];
      localStorage.setItem('shelfspot_favs', JSON.stringify(newList));
      return newList;
    });
  }

  private loadFromStorage(): ApiBookData[] {
    const data = localStorage.getItem('shelfspot_favs');
    return data ? JSON.parse(data) : [];
  }

  isFavorite(book: ApiBookData): boolean {
    return this.favorites().some(b => b.key === book.key);
  }
}