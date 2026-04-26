import { Component, computed, input } from '@angular/core';
import { ButtonVariant } from '../../types/custom-components-types';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button [type]="type()" [disabled]="disabled()">
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './button.css',
  host: {
    '[class]': 'variantClass()',
    '[class.disabled]': 'disabled()'
  }
})
export class Button {
  variant = input<ButtonVariant>('primary');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  href = input<string>()

  protected variantClass = computed(() => `btn-${this.variant()}`);
}
