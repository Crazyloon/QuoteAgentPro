import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAgentsListComponent } from './pending-agents-list.component';

describe('PendingAgentsListComponent', () => {
  let component: PendingAgentsListComponent;
  let fixture: ComponentFixture<PendingAgentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingAgentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingAgentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
