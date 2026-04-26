import { 
    Directive, 
    ViewContainerRef, 
    input, 
    HostListener, 
    ComponentRef,
    inject 
} from '@angular/core';
import { SidebarTooltip } from '../../shared/components/tooltip/tooltip';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  
  text = input.required<string>({ alias: 'appTooltip' });
  //The directive creates the component only if the sidebar is collapsed
  shouldShow = input<boolean>(true, { alias: 'appTooltipEnabled' });  

  private vcr = inject(ViewContainerRef);
  private componentRef: ComponentRef<SidebarTooltip> | null = null;

  @HostListener('mouseenter')
  onMouseEnter() {
    // if the sidebar is set to open, we don't create the component
    if (!this.shouldShow() || this.componentRef) return;

    this.componentRef = this.vcr.createComponent(SidebarTooltip);
    
    this.componentRef.setInput('text', this.text());
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.destroy();
  }

  ngOnDestroy() {
    this.destroy();
  }

  private destroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}