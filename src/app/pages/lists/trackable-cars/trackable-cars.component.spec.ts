import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackableCarsComponent } from './trackable-cars.component';

describe('TrackableCarsComponent', () => {
  let component: TrackableCarsComponent;
  let fixture: ComponentFixture<TrackableCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackableCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackableCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
