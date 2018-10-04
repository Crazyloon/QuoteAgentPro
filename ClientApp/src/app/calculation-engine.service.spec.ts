import { TestBed, inject } from '@angular/core/testing';

import { CalculationEngineService } from './calculation-engine.service';

describe('CalculationEngineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculationEngineService]
    });
  });

  it('should be created', inject([CalculationEngineService], (service: CalculationEngineService) => {
    expect(service).toBeTruthy();
  }));
});
