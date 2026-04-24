import { TestBed } from '@angular/core/testing';
import { IconComponent } from './icon';
import { describe, it, expect, beforeEach } from 'vitest';

describe('IconComponent', () => {
  
  beforeEach(async () => {
    // We strictly configure the testing module first
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();
  });

  it('should render the correct image source path', () => {
    // Create the component instance
    const fixture = TestBed.createComponent(IconComponent);
    const component = fixture.componentInstance;
    
    // Set inputs via the signal reference
    fixture.componentRef.setInput('name', 'menu.svg');
    fixture.detectChanges();

    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    
    // Check if the path is correctly built
    expect(img.src).toContain('/assets/icons/menu.svg');
  });

  it('should apply custom dimensions', () => {
    const fixture = TestBed.createComponent(IconComponent);
    fixture.componentRef.setInput('name', 'mail.svg');
    fixture.componentRef.setInput('size', 50);
    fixture.detectChanges();

    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    
    // Validate inline styles
    expect(img.style.width).toBe('50px');
    expect(img.style.height).toBe('50px');
  });
});