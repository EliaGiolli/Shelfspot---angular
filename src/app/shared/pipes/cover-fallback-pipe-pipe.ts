import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coverFallbackPipe',
  standalone: true
})
export class CoverFallbackPipe implements PipeTransform {
 transform(coverId: number | undefined, size: 'S' | 'M' | 'L' = 'M'): string {
    return coverId 
      ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
      : 'assets/images/book-fallback-cover.jpg'; // the default cover fallback
  }
}

/**
 * The OpenLibrary API usually doesn't return the book cover (cover_i is null).
 * Instead of overload the template with conditional logic, a custom Pipe can handle the fallback
 */