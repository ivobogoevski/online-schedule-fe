import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClass } from 'src/app/shared/models/class.model';
import { apiEndPoint } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http: HttpClient) { }

  getAllClasses(){
    return this.http.get<IClass[]>(`${apiEndPoint}/student/classes/available`);
  }

  getStudentClasses(){
    return this.http.get<IClass[]>(`${apiEndPoint}/student/classes`);
  }

  assignClasses(classes){
    const body = {
      classes
    };
    return this.http.post<any>(`${apiEndPoint}/student/assign/classes`, body);
  }

  getTeacherClasses(){
    return this.http.get<IClass[]>(`${apiEndPoint}/teacher/classes`);
  }

  getClassByCode(code: string){
    return this.http.get<IClass>(`${apiEndPoint}/classes/${code}`);
  }
}
