import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../tokens/api.token';
import { delay, Observable, of, tap } from 'rxjs';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);
  
  // Signal to manage the global state of the sending
  isSending = signal(false);

  sendMessage(data: ContactMessage): Observable<any> {
    this.isSending.set(true);
    
    // Simulate an API call with a 1.5s delay
    return of({ success: true }).pipe(
      delay(1500),
      tap(() => this.isSending.set(false))
    );
  }
}