import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/appointments-view',
    pathMatch: 'full',
  } /* Default URL */,
  {
    path: 'appointments-view',
    loadChildren: () =>
      import('./appointments-view/appointments-view.module').then(
        (m) => m.CalendarViewModule
      ),
  },
  {
    path: 'add-appointments',
    loadChildren: () =>
      import('./add-appointments/add-appointments.module').then(
        (m) => m.AddAppointmentCalendarModule
      ),
  },
  {
    path: 'scheduler/:appointmenttitle',
    loadChildren: () =>
      import('./scheduler/scheduler.module').then(
        (m) => m.AppointmentsSchedulerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
