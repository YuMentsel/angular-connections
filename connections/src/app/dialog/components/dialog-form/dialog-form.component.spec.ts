import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormComponent } from './dialog-form.component';

describe('DialogFormComponent', () => {
  let component: DialogFormComponent;
  let fixture: ComponentFixture<DialogFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFormComponent],
    });
    fixture = TestBed.createComponent(DialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
