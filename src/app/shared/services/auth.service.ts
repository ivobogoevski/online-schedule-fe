import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiEndPoint = environment.api;

  constructor(private http: HttpClient) { }

  register(name, email, pass, study, index): Observable<any> {
    const body = {
      Name: name,
      Email: email,
      Password: pass,
      Study: study,
      Index: index
    };
    return this.http.post<any>(`${this.apiEndPoint}/auth/register`, body);
  }

  login(email, pass): Observable<any>{
    const body = {
      Email: email,
      Password: pass
    };
    return this.http.post<any>(`${this.apiEndPoint}/auth/login`, body);
  }

  teacherLogin(email, pass): Observable<any> {
    const body = {
      Email: email,
      Password: pass
    };
    return this.http.post<any>(`${this.apiEndPoint}/auth/teacher/login`, body);
  }

  update(name, email, index, study): Observable<any>{
    const body = {
      Name: name,
      Email: email,
      IndexNumber: index,
      Study: study
    };

    return this.http.put<any>(`${this.apiEndPoint}/auth/user`, body);
  }

  teacherUpdate(name, email, office): Observable<any> {
    const body = {
      Name: name,
      Email: email,
      Office: office
    };
    return this.http.put<any>(`${this.apiEndPoint}/auth/teacher`, body);
  }

  changePassword(password, newPassword): Observable<any> {
    const body = {
      Password: password,
      NewPassword: newPassword
    };

    return this.http.put<any>(`${this.apiEndPoint}/auth/change-password`, body);
  }

  refreshToken(): Observable<any>{
    return this.http.post<any>(`${this.apiEndPoint}/auth/refresh-token`, {RefreshToken: localStorage.getItem('os_auth_refresh')});
  }
}
