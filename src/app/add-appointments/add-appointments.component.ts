import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppointmentsService } from '../services/appointments.service';

@Component({
  selector: 'app-add-appointment-calendar',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.scss'],
})
export class AddAppointmentsComponent implements OnInit {
  calendarForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddAppointmentsComponent>,
    private appointmentService: AppointmentsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.calendarForm = this.fb.group({
      appointmentTitle: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      appointmentDate: [''],
      appointmentDateRange: new FormGroup({
        startDate: new FormControl(),
        endDate: new FormControl(),
      }),
      appointmentTime: [
        '',
        {
          validators: [Validators.required]
        }
      ],
      appointmentDescription: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    });
  }
  ngOnInit(): void {
    this.calendarForm.patchValue(this.data);
  }
  formSubmit() {
    if (this.calendarForm.valid) {
      if (this.data) {
        this.appointmentService
          .updateAppointments(this.data.id, this.calendarForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Appointment updated successfully');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              alert(err);
            },
          });
      } else {
        // console.log(this.empForm.value) => testing the value, whether the form works successfully
        this.appointmentService.addAppointments(this.calendarForm.value).subscribe({
          next: (val: any) => {
            alert('Appointment added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            alert(err);
          },
        });
      }
    }
  }
}
