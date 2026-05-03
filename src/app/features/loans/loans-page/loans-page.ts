import { Component, inject, signal } from "@angular/core";
import { CoverFallbackPipe } from '../../../shared/pipes/cover-fallback-pipe-pipe';
import { DatePipe } from '@angular/common';
import { Button } from "../../../shared/components/button/button";
import { LoanService } from "../../../core/services/loans.service";

@Component({
  selector: 'app-loans-page',
  standalone: true,
  imports: [CoverFallbackPipe, DatePipe, Button],
  template: `
    <!-- loans.component.html -->
<div class="grid gap-4">
  @for (item of loanService.loans(); track item.id) {
    <div class="p-4 bg-white border border-primary/5 rounded-2xl flex justify-between items-center shadow-sm">
      <div class="flex gap-4 items-center">
        <img [src]="item.book.cover_i | coverFallbackPipe:'S'" class="w-12 h-16 object-cover rounded-lg">
        <div>
          <h3 class="font-bold">{{ item.book.title }}</h3>
          <p class="text-xs text-primary/40 italic">Return by: {{ item.dueDate | date }}</p>
        </div>
      </div>
      <app-button variant="secondary" (click)="loanService.returnBook(item.id)">Return</app-button>
    </div>
  } @empty {
    <p class="italic text-primary/30">You have no active loans.</p>
  }
</div>
  `
})
export class LoansPage {
  public loanService = inject(LoanService);

}