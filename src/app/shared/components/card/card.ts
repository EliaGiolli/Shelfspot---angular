import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <article 
      class="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border border-primary/5 flex flex-col group h-full"
      [attr.aria-labelledby]="titleId()"
    >
      <div class="card-header mb-4" aria-hidden="true">
        <ng-content select="[card-header]"></ng-content>
      </div>
      <div class="card-body grow">
        <ng-content select="[card-body]"></ng-content>
      </div>
      <div class="card-footer mt-4">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </article>
  `
})
export class CardComponent {
  // Passiamo un ID univoco per collegare la card al suo titolo internamente
  titleId = input.required<string>();
}