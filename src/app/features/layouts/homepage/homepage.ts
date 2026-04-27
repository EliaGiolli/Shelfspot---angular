import { Component, signal } from '@angular/core';
import { IconComponent } from '../../../shared/components/icon/icon';
import { Herosection } from "../../../shared/components/herosection/herosection";

//static data
import { reviews } from '../../../core/models/reviews.model';
import { benefits } from '../../../core/models/benefits.model';
import { FAQs } from '../../../core/models/faqs.model';
import { CardComponent } from '../../../shared/components/card/card';

@Component({
  selector: 'app-homepage',
  imports: [IconComponent, Herosection, CardComponent],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  readonly benefits = benefits;
  readonly reviews = reviews;
  readonly faqs = FAQs;

  // Logic for the accordion
  expandedIndex = signal<number | undefined>(undefined);

  toggleFaq(index: number) {
    this.expandedIndex.update(val => val === index ? undefined : index);
  }
}
