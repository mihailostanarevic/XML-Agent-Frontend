import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRentComponent } from './agent-rent.component';

describe('AgentRentComponent', () => {
  let component: AgentRentComponent;
  let fixture: ComponentFixture<AgentRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
