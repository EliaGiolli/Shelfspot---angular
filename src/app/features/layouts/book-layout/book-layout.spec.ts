import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLayout } from './book-layout';

describe('BookLayout', () => {
  let component: BookLayout;
  let fixture: ComponentFixture<BookLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(BookLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
