import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentManagementListComponent } from './agent-management-list.component';

describe('AgentManagementListComponent', () => {
  let component: AgentManagementListComponent;
  let fixture: ComponentFixture<AgentManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
