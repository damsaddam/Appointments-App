import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppointmentCalendarComponent } from './add-appointments.component';

describe('AddAppointmentCalendarComponent', () => {
  let component: AddAppointmentCalendarComponent;
  let fixture: ComponentFixture<AddAppointmentCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAppointmentCalendarComponent]
    });
    fixture = TestBed.createComponent(AddAppointmentCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
