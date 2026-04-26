import { Component, input } from "@angular/core";

@Component({
  selector: 'app-sidebar-tooltip',
  standalone: true,
  template: `
    <div class="bg-primary text-white px-3 py-1.5 rounded-md text-xs 
                absolute left-4 z-100 whitespace-nowrap shadow-xl 
                border border-secondary/10 animate-in fade-in zoom-in duration-200">
      {{ text() }}
      <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rotate-45"></div>
    </div>
  `,
})
export class SidebarTooltip {
  text = input.required<string>(); 
}