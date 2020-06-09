import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightSearchFormComponent } from './light-search-form.component';

describe('LightSearchFormComponent', () => {
  let component: LightSearchFormComponent;
  let fixture: ComponentFixture<LightSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
