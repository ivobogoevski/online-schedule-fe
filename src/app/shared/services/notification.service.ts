import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { INotification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  apiEndPoint = environment.api;

  constructor(private http: HttpClient) { }

  getAllNotifications(): Observable<INotification[]> {
    return this.http.get<INotification[]>(`${this.apiEndPoint}/notifications`);
  }

  getAllTeacherNotifications(): Observable<INotification[]> {
    return this.http.get<INotification[]>(`${this.apiEndPoint}/notifications/teacher`);
  }

  createNotification(notification): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint}/notifications`, notification);
  }

  editNotification(notification: INotification): Observable<INotification> {
    return this.http.put<INotification>(`${this.apiEndPoint}/notifications`, notification);
  }

  deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiEndPoint}/notifications/${notificationId}`);
  }
}
