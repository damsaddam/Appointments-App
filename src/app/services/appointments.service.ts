import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IScheduler } from '../scheduler/model/scheduler-interface';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private apiUrl = 'http://localhost:3000/scheduler';
  constructor(private http: HttpClient) { }

  /* Appointments */
  /* Create data */
  addAppointments(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/appointments', data);
  }

  /* Fetch data */
  getAppointments(): Observable<any> {
    return this.http.get('http://localhost:3000/appointments');
  }

  /* Delete data */
  deleteAppointments(id: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/appointments/${id}`);
  }

  /* Update data */
  updateAppointments(id: any, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/appointments/${id}`, data);
  }

  /* Scheduler */
  /* Create data */
  getAllScheduler(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addScheduler(schedule: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, schedule);
  }

  updateScheduler(id: any, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/scheduler/${id}`, data);
  }

  deleteScheduler(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
