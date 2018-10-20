import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsFormComponent } from './discounts-form.component';

describe('DiscountsFormComponent', () => {
  let component: DiscountsFormComponent;
  let fixture: ComponentFixture<DiscountsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
