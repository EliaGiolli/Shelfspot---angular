import { 
  Component, 
  inject, 
  signal, 
  OnInit 
} from '@angular/core';
import { IconComponent } from '../icon/icon';
import { CardComponent } from '../card/card';
import { Button } from '../button/button';

import { HttpBookService } from '../../../core/services/http-book.service';
import { ApiBookData } from '../../types/api-book-data';

@Component({
  selector: 'app-herosection',
  imports: [IconComponent, CardComponent, Button],
  templateUrl: './herosection.html',
  styleUrl: './herosection.css',
})
export class Herosection implements OnInit {
  private bookService = inject(HttpBookService);
  featuredBook = signal<ApiBookData | null>(null);

  ngOnInit() {
    this.bookService.getFirstBookByQuery('The Great Gatsby').subscribe(
      book => this.featuredBook.set(book as ApiBookData)
    );
  }
}
