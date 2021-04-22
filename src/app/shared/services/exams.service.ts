import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IClass } from '../models/class.model';
import { map } from 'rxjs/operators';
import { IExam } from '../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  apiEndPoint = environment.api;

  constructor(private http: HttpClient) { }

  getAll(examType: number): Observable<IClass[]> {
    return this.http.get<IClass[]>(`${this.apiEndPoint}/exams`).pipe(
      map( res => {
        res = res.filter( e => e.Exam.ExamType === examType);
        return res;
      })
    );
  }

  getExamsByClassCode(classCode: string): Observable<IExam[]> {
    return this.http.get<IExam[]>(`${this.apiEndPoint}/exams/class/${classCode}`);
  }

  addExam(exam: IExam): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint}/exams`, exam);
  }

  editExam(exam: IExam): Observable<any> {
    return this.http.put<any>(`${this.apiEndPoint}/exams`, exam);
  }

  deleteExam(examID: number): Observable<any> {
    return this.http.delete<any>(`${this.apiEndPoint}/exams/${examID}`)
  }
}
