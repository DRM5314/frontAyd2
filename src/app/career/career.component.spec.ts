import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerComponent } from './career.component';

describe('CareerComponent', () => {
  let component: CareerComponent;
  let fixture: ComponentFixture<CareerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CareerComponent]
    });
    fixture = TestBed.createComponent(CareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
