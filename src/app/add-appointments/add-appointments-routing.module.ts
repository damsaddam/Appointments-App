import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAppointmentsComponent } from './add-appointments.component';

const routes: Routes = [{ path: '', component: AddAppointmentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAppointmentCalendarRoutingModule { }
