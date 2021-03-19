import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClass } from 'src/app/shared/models/class.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  apiEndPoint = environment.api;

  constructor(private http: HttpClient) { }

  getAllClasses(): Observable<IClass[]> {
    return this.http.get<IClass[]>(`${this.apiEndPoint}/student/classes/available`);
  }

  getStudentClasses(): Observable<IClass[]> {
    return this.http.get<IClass[]>(`${this.apiEndPoint}/student/classes`);
  }

  assignClasses(classes): Observable<any>{
    const body = {
      classes
    };
    return this.http.post<any>(`${this.apiEndPoint}/student/assign/classes`, body);
  }

  getTeacherClasses(): Observable<IClass[]> {
    return this.http.get<IClass[]>(`${this.apiEndPoint}/teacher/classes`);
  }

  getClassByCode(code: string) : Observable<IClass>{
    return this.http.get<IClass>(`${this.apiEndPoint}/classes/${code}`);
  }
}
