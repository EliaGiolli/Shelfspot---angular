import { 
  Component, 
  inject, 
  signal, 
  OnInit 
} from '@angular/core';
import { 
  FormControl, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';
import { 
  debounceTime, 
  distinctUntilChanged, 
  switchMap, 
  filter, 
  tap 
} from 'rxjs/operators';
import { HttpBookService } from '../../../core/services/http-book.service';
import { ApiBookData } from '../../../shared/types/api-book-data';
import { IconComponent } from '../../../shared/components/icon/icon';
import { Button } from '../../../shared/components/button/button';
import { CardComponent } from '../../../shared/components/card/card';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    IconComponent, 
    Button, 
    CardComponent
  ], 
  templateUrl: './search-page.html'
})
export class SearchPage implements OnInit {
  private bookService = inject(HttpBookService);
  
  books = signal<ApiBookData[]>([]);
  isLoading = signal(false);

  formGroup = new FormGroup({
    bookInput: new FormControl('', { nonNullable: true })
  });

  ngOnInit() {
    this.formGroup.controls.bookInput.valueChanges.pipe(
      debounceTime(400),           // It waits 400ms
      distinctUntilChanged(),      // The data fetching proceeds only if the text has changed
      filter(query => query.length > 2), 
      tap(() => this.isLoading.set(true)),
      switchMap(query => this.bookService.searchBooks(query)) // It cancels the previous search if a new one starts
    ).subscribe({
      next: (results) => {
        this.books.set(results);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  clearSearch() {
    this.formGroup.controls.bookInput.setValue(''); 
    this.books.set([]);
  }
}