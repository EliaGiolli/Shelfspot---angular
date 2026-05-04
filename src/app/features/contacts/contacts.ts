import { 
  Component, 
  signal, 
  computed, 
  inject 
} from '@angular/core';
// Custom Components
import { Button } from '../../shared/components/button/button';
import { IconComponent } from '../../shared/components/icon/icon';
// Services and Validators
import { ContactsService } from '../../core/services/contacts.service';
import { isProfessionalEmail } from '../../shared/validators/signal-validator';
// Types
import { FormStatus } from '../../shared/types/custom-components-types';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [Button, IconComponent],
  templateUrl: './contacts.html'
})
export class Contacts {
  public contactService = inject(ContactsService);
  // Form state via Signal
  name = signal('');
  email = signal('');
  message = signal('');

  // Signal for the submit button
  status = signal<FormStatus>(FormStatus.idle);

  // Signals for error handling
  nameTouched = signal(false);
  emailTouched = signal(false);
  messageTouched = signal(false);

  // Derived validation (Computed Signals)
  isEmailValid = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = this.email();
    return emailRegex.test(this.email()) && isProfessionalEmail(value);
  });

  isFormValid = computed(() => {
    return this.name().length > 2 && 
           this.isEmailValid() && 
           this.message().length > 10 &&
           !this.contactService.isSending();
  });

  // Error handling
  nameError = computed(() => {
    if (!this.nameTouched()) return null;
    if (this.name().length === 0) return 'Name is required';
    if (this.name().length <= 2) return 'Name must be at least 3 characters';
    return null;
  });

  emailError = computed(() => {
    if (!this.emailTouched()) return null;
    if (!this.email()) return 'Email is required';
    if (!this.isEmailValid()) return 'Please enter a professional email address';
    return null;
  });

  // Update methods
  updateField(field: 'name' | 'email' | 'message', event: Event) {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    if (field === 'name') this.name.set(value);
    if (field === 'email') this.email.set(value);
    if (field === 'message') this.message.set(value);
  }

  sendContact() {
    if (!this.isFormValid()) return;

    this.status.set(FormStatus.sending);

    const payload = {
      name: this.name(),
      email: this.email(),
      message: this.message()
    };

    this.contactService.sendMessage(payload).subscribe({
      next: () => {
        this.status.set(FormStatus.success);
        this.resetForm();
        setTimeout(() => this.status.set(FormStatus.idle), 3000); 
      },
      error: () => this.status.set(FormStatus.error)
    });
  }

  private resetForm() {
    this.name.set('');
    this.email.set('');
    this.message.set('');
  }
}