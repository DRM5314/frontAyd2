import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCareerComponent } from './add-edit-career.component';

describe('AddEditCareerComponent', () => {
  let component: AddEditCareerComponent;
  let fixture: ComponentFixture<AddEditCareerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditCareerComponent]
    });
    fixture = TestBed.createComponent(AddEditCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
