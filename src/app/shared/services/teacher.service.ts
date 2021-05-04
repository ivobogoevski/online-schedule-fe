import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITeacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  apiEndPoint = environment.api;

  constructor(private http: HttpClient) { }

  getAllTeachers(): Observable<ITeacher[]> {
    return this.http.get<ITeacher[]>(this.apiEndPoint + '/teacher');
  }

  editTeacher(teacher: ITeacher): Observable<any> {
    return this.http.put<any>(this.apiEndPoint + '/teacher', teacher);
  }

  addTeacher(teacher: ITeacher): Observable<any> {
    return this.http.post<any>(this.apiEndPoint + '/teacher', teacher);
  }

  changeTeacherStatus(teacherID, status): Observable<any> {
    const body = {
      TeacherId: teacherID,
      Active: status
    }
    return this.http.put(this.apiEndPoint + '/teacher/status', body);
  }
}
