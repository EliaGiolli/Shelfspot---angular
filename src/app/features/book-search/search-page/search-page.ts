import { 
  Component, 
  inject, 
  signal, 
} from '@angular/core';
import { 
  FormControl, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';
import { combineLatest } from 'rxjs';
import { 
  debounceTime, 
  startWith,
  distinctUntilChanged, 
  switchMap, 
  tap, 
} from 'rxjs/operators';
import { of } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HttpBookService } from '../../../core/services/http-book.service';
import { IconComponent } from '../../../shared/components/icon/icon';
import { Button } from '../../../shared/components/button/button';
import { CardComponent } from '../../../shared/components/card/card';
import { CoverFallbackPipe } from '../../../shared/pipes/cover-fallback-pipe-pipe';
import { Router, RouterOutlet } from '@angular/router';
import { BookSearchResult } from '../../../core/schemas/book-api.schema';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    IconComponent, 
    Button, 
    CardComponent,
    CoverFallbackPipe,
    RouterOutlet
  ], 
  templateUrl: './search-page.html'
})
export class SearchPage {
  private bookService = inject(HttpBookService);
  private router = inject(Router);
  isLoading = signal(false);
  currentPage = signal(1);

  formGroup = new FormGroup({
    bookInput: new FormControl('', { nonNullable: true })
  });

  // An Observable defines the stream of search
  private books$ = combineLatest([
    this.formGroup.controls.bookInput.valueChanges.pipe(
      startWith(this.formGroup.controls.bookInput.value),
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => this.currentPage.set(1))
    ),
    toObservable(this.currentPage)
  ]).pipe(
    switchMap(([query, page]) => {
      if (query.length <= 2) {
        return of([]); // if the query è short, we emit an empty array 
      }
      this.isLoading.set(true);
      return this.bookService.searchBooks(query, page).pipe(
        tap(() => this.isLoading.set(false))
      );
    })
  );

  // if there isn't data, we use an empty array []
  books = toSignal(this.books$, { initialValue: [] });

  // Metodi per la UI
  goToNext() { this.currentPage.update(p => p + 1); }
  goToPrev() { this.currentPage.update(p => Math.max(1, p - 1)); }

  clearSearch() {
    this.formGroup.controls.bookInput.setValue(''); 
  }

  viewDetails(book: BookSearchResult) {
    // Puliamo la stringa '/works/OL12345W' per ottenere solo 'OL12345W'
    const bookId = book.key.replace('/works/', '');
    
    // Navighiamo verso la rotta specifica
    this.router.navigate(['/books/search', bookId]);
  }
}