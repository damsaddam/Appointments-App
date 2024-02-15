import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IScheduler } from './model/scheduler-interface';
import { AppointmentsService } from '../services/appointments.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointments-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit {
  scheduleList: IScheduler[] = [];
  scheduleInProgress: IScheduler[] = [];
  scheduleDone: IScheduler[] = [];
  scheduleForm!: FormGroup;
  updateIndex: any;
  isEditEnabled: boolean = false;
  constructor(
    private fb: FormBuilder,
    private schedulerService: AppointmentsService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    const appointmentTitle = this.router.snapshot.paramMap.get('appointmenttitle') /* in here asshole */
    this.scheduleForm = this.fb.group({
      item: new FormControl(
        { value: appointmentTitle, disabled: false },
        { validators: [Validators.required] }
      ),
    });

    this.loadScheduler();
  }

  loadScheduler() {
    this.schedulerService.getAllScheduler().subscribe((data) => {
      this.scheduleList = data.filter((schedule) => schedule.status === 'list');
      this.scheduleInProgress = data.filter(
        (schedule) => schedule.status === 'in-progress'
      );
      this.scheduleDone = data.filter((schedule) => schedule.status === 'done');
    });
  }

  addScheduler() {
    const newSchedule: IScheduler = {
      description: this.scheduleForm.value.item,
      status: 'list',
      id: undefined,
    };

    this.schedulerService.addScheduler(newSchedule).subscribe(() => {
      this.loadScheduler();
      this.scheduleForm.reset();
    });
  }

  updateScheduler() {
    // Get the original schedule
    const originalSchedule = this.scheduleList[this.updateIndex];

    // Update only the description property
    const updatedSchedule: IScheduler = {
      ...originalSchedule,
      description: this.scheduleForm.value.item,
    };

    this.schedulerService
      .updateScheduler(updatedSchedule.id, updatedSchedule)
      .subscribe({
        next: () => {
          // Success
          alert('Schedule updated successfully');
          this.loadScheduler();
          this.scheduleForm.reset();
          this.isEditEnabled = false;
        },
        error: (error) => {
          // Handle the error (e.g., show a message to the user)
          alert('Updated failed');
        },
      });
  }

  onEditSchedule(item: IScheduler, index: any) {
    // Set the form values based on the clicked item
    this.scheduleForm.patchValue({
      id: item.id,
      item: item.description,
    });

    // Save the index for reference when updating
    this.updateIndex = index;

    // Enable the edit mode
    this.isEditEnabled = true;
  }

  deleteScheduler(index: any) {
    const id = this.scheduleList[index].id;

    this.schedulerService.deleteScheduler(id).subscribe(() => {
      this.loadScheduler();
    });
  }

  deleteInProgress(index: any) {
    const id = this.scheduleInProgress[index].id;

    this.schedulerService.deleteScheduler(id).subscribe(() => {
      this.loadScheduler();
    });
  }
  deleteDone(index: any) {
    const id = this.scheduleDone[index].id;

    this.schedulerService.deleteScheduler(id).subscribe(() => {
      this.loadScheduler();
    });
  }

  drop(event: CdkDragDrop<IScheduler[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const movedItem = event.previousContainer.data[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // After transferring, update the status
      this.updateStatusOnDrop(movedItem, event.container.id);
    }
  }

  updateStatusOnDrop(item: IScheduler, containerId: string) {
    let status: 'list' | 'in-progress' | 'done';

    if (containerId === 'cdk-drop-list-1') {
      status = 'list';
    } else if (containerId === 'cdk-drop-list-2') {
      status = 'in-progress';
    } else if (containerId === 'cdk-drop-list-3') {
      status = 'done';
    } else {
      // Default to 'todo' if containerId is not recognized
      status = 'list';
    }

    const updatedSchedule: IScheduler = {
      ...item,
      status: status,
    };

    this.schedulerService
      .updateScheduler(updatedSchedule.id, updatedSchedule)
      .subscribe(() => {
        this.loadScheduler();
      });
  }
}
