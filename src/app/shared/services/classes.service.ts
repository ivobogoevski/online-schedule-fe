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

  addClass(reqBody: IClass): Observable<any> {
    return this.http.post(`${this.apiEndPoint}/classes`, reqBody);
  }

  editClass(reqBody: IClass): Observable<IClass> {
    return this.http.put<IClass>(`${this.apiEndPoint}/classes`, reqBody);
  }

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

  assignClassToTeacher(body): Observable<any>{
    return this.http.post<any>(`${this.apiEndPoint}/teacher/assign/class`, body);
  }

  deleteClass(classCode: string): Observable<any> {
    return this.http.delete(`${this.apiEndPoint}/classes/${classCode}`);
  }
}
