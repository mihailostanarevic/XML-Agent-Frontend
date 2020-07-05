import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersAndAgentsComponent } from './customers-and-agents.component';

describe('CustomersAndAgentsComponent', () => {
  let component: CustomersAndAgentsComponent;
  let fixture: ComponentFixture<CustomersAndAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersAndAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersAndAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
