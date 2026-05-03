// src/app/core/services/loan.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { BookDetail } from '../schemas/book-api.schema';
import { type Loan } from '../../shared/types/loans.types';


@Injectable({ providedIn: 'root' })
export class LoanService {
  private loansSignal = signal<Loan[]>([]);

  // Espone il segnale come ReadOnly
  loans = this.loansSignal.asReadonly();

  // Dato derivato: conta i libri in prestito
  loanCount = computed(() => this.loansSignal().length);

  addLoan(book: BookDetail) {
    if (this.isBorrowed(book.key)) return;

    const newLoan: Loan = {
      id: Math.random().toString(36).substring(2),
      book,
      loanDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 giorni
    };

    this.loansSignal.update(current => [...current, newLoan]);
  }

  isBorrowed(bookKey: string): boolean {
    return this.loansSignal().some(loan => loan.book.key === bookKey);
  }

  returnBook(loanId: string) {
    this.loansSignal.update(current => current.filter(l => l.id !== loanId));
  }
}