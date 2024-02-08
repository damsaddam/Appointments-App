import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulerComponent } from './scheduler.component';

describe('AppointmentsSchedulerComponent', () => {
  let component: SchedulerComponent;
  let fixture: ComponentFixture<SchedulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulerComponent],
    });
    fixture = TestBed.createComponent(SchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
