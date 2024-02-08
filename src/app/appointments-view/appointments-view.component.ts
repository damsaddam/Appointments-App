import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddAppointmentsComponent } from '../add-appointments/add-appointments.component';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentsService } from '../services/appointments.service';

@Component({
  selector: 'appointments-view',
  templateUrl: './appointments-view.component.html',
  styleUrls: ['./appointments-view.component.scss'],
})
export class AppointmentsViewComponent implements OnInit {
  displayedColumns: string[] = [
    'appointmentTitle',
    'appointmentDate',
    'appointmentDateRange',
    'appointmentTime',
    'appointmentDescription',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private appointmentService: AppointmentsService
  ) { }

  ngOnInit(): void {
    this.appointmentList();
  }

  openForm() {
    const dialogRef = this.dialog.open(AddAppointmentsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.appointmentList();
        }
      },
    });
  }

  editList(data: any) {
    const dialogRef = this.dialog.open(AddAppointmentsComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.appointmentList();
        }
      },
    });
  }

  appointmentList() {
    this.appointmentService.getAppointments().subscribe({
      next: (val) => {
        this.dataSource = new MatTableDataSource(val);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  confirmDelete(id: any) {
    /* Display a confirmation dialog */
    const isConfirmed = window.confirm('Are you sure to delete this employee?');

    /* If the user confirms, proceed with the deletion */
    if (isConfirmed) {
      this.deleteList(id);
    }
  }

  deleteList(id: any) {
    this.appointmentService.deleteAppointments(id).subscribe({
      next: (val) => {
        alert('Appointment deleted successfully');
        this.appointmentList(); // Refresh the data automatically
      },
      error: console.log,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
