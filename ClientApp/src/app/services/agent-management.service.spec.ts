import { TestBed, inject } from '@angular/core/testing';

import { AgentManagementService } from './agent-management.service';

describe('AgentManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgentManagementService]
    });
  });

  it('should be created', inject([AgentManagementService], (service: AgentManagementService) => {
    expect(service).toBeTruthy();
  }));
});
