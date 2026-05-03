// src/app/shared/directives/click-feedback.directive.ts
import { Directive, HostListener, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appClickFeedback]',
  standalone: true
})
export class ClickFeedbackDirective {
  private el = inject(ElementRef);

  @HostListener('mousedown') onMouseDown() {
    this.el.nativeElement.style.transform = 'scale(0.95)';
    this.el.nativeElement.style.transition = 'transform 0.1s';
  }

  @HostListener('mouseup') onMouseUp() {
    this.el.nativeElement.style.transform = 'scale(1)';
  }
}