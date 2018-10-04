import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuotePageComponent } from './new-quote-page.component';

describe('NewQuotePageComponent', () => {
  let component: NewQuotePageComponent;
  let fixture: ComponentFixture<NewQuotePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQuotePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
