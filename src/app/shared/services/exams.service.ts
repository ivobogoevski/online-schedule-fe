import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IClass } from '../models/class.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  apiEndPoint = environment.api;

  constructor(private http: HttpClient) { }

  getAll(examType: number): Observable<IClass[]> {
    return this.http.get<IClass[]>(`${this.apiEndPoint}/exams`).pipe(
      map( res => {
        res = res.filter( e => e.Exam.Type === examType);
        return res;
      })
    );
  }
}
