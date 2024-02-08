import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAppointmentCalendarRoutingModule } from './add-appointments-routing.module';
import { AddAppointmentsComponent } from './add-appointments.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [AddAppointmentsComponent],
  imports: [
    CommonModule,
    AddAppointmentCalendarRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    NgxMaterialTimepickerModule
  ],
})
export class AddAppointmentCalendarModule { }
