import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../constants';
import { IClass } from '../models/class.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  constructor(private http: HttpClient) { }

  getAll(examType: number): Observable<any> {
    return this.http.get<IClass[]>(`${apiEndPoint}/exams`).pipe(
      map( res => {
        res = res.filter( e => e.Exam.Type === examType);
        return res;
      })
    );
  }
}
