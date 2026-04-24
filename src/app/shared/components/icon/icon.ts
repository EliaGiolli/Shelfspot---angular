import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <span 
      class="flex items-center justify-center rounded-full border border-primary/10 bg-secondary/80 p-3 
             transition-all duration-300 ease-out cursor-pointer
             hover:-translate-y-0.5 hover:border-accent/30 hover:bg-secondary hover:shadow-lg hover:shadow-primary/5"
      [style.width.px]="size()" 
      [style.height.px]="size()"
    >
      <img 
        [src]="'/assets/icons/' + name()" 
        [style.width.px]="size()" 
        [style.height.px]="size()"
        [attr.alt]="decorative() ? '' : (alt() || (name() + ' icon'))"
        [attr.aria-hidden]="decorative() ? 'true' : null"
        class="block"
      />
    </span>
  `
})
export class IconComponent {
  name = input.required<string>(); 
  size = input<number>(24);
  decorative = input<boolean>(false);
  alt = input<string | undefined>();
}