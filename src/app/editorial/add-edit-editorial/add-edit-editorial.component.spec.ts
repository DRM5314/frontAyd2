import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEditorialComponent } from './add-edit-editorial.component';

describe('AddEditEditorialComponent', () => {
  let component: AddEditEditorialComponent;
  let fixture: ComponentFixture<AddEditEditorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditEditorialComponent]
    });
    fixture = TestBed.createComponent(AddEditEditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
