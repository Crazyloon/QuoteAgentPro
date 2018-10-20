import { TestBed, inject } from '@angular/core/testing';

import { DiscountService } from './discount.service';

describe('DiscountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscountService]
    });
  });

  it('should be created', inject([DiscountService], (service: DiscountService) => {
    expect(service).toBeTruthy();
  }));
});
