import { Component, inject, input, viewChild, ElementRef, effect } from '@angular/core';
import { Location } from '@angular/common';
// RxJS and Operators
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
// Services
import { HttpBookService } from '../../../core/services/http-book.service';
import { FavoriteService } from '../../../core/services/favorites.service';
import { LoanService } from '../../../core/services/loans.service';
// Custom Components
import { IconComponent } from '../../../shared/components/icon/icon';
import { Button } from '../../../shared/components/button/button';
// Pipes and Directives
import { CoverFallbackPipe } from '../../../shared/pipes/cover-fallback-pipe-pipe';
import { ClickFeedbackDirective } from '../../../shared/directives/click-feedback.directive';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [
    IconComponent, 
    Button, 
    CoverFallbackPipe, 
    ClickFeedbackDirective
  ],
  templateUrl: './search-modal.html',
  styles: [`
    dialog::backdrop {
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
    }
    dialog {
      border: none;
      background: transparent;
      max-width: 100vw;
      max-height: 100vh;
    }
  `]
})
export class SearchModalComponent {
  private bookService = inject(HttpBookService);
  public favoriteService = inject(FavoriteService);
  public loanService = inject(LoanService)
  private location = inject(Location);

  // Recupera il riferimento all'elemento <dialog> nel template
  dialog = viewChild.required<ElementRef<HTMLDialogElement>>('bookDialog');

  id = input.required<string>();

  book = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => this.bookService.searchBookById(id))
    )
  );

  constructor() {
    // Reagisce automaticamente quando il libro viene caricato
    effect(() => {
      const dialogEl = this.dialog().nativeElement;
      if (this.book()) {
        dialogEl.showModal(); // Apre il modale nativo
      } else {
        dialogEl.close();
      }
    });
  }

  goBack() {
    this.dialog().nativeElement.close();
    this.location.back();
  }
}