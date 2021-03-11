import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(name, email, pass, study, index): Observable<any> {
    const body = {
      Name: name,
      Email: email,
      Password: pass,
      Study: study,
      Index: index
    };
    return this.http.post<any>(`${apiEndPoint}/auth/register`, body);
  }

  login(email, pass){
    const body = {
      Email: email,
      Password: pass
    };
    return this.http.post<any>(`${apiEndPoint}/auth/login`, body);
  }

  teacherLogin(email, pass) {
    const body = {
      Email: email,
      Password: pass
    };
    return this.http.post<any>(`${apiEndPoint}/auth/teacher/login`, body);
  }

  update(name, email, index, study){
    const body = {
      Name: name,
      Email: email,
      IndexNumber: index,
      Study: study
    };

    return this.http.put<any>(`${apiEndPoint}/auth/user`, body);
  }

  teacherUpdate(name, email, office) {
    const body = {
      Name: name,
      Email: email,
      Office: office
    };
    return this.http.put<any>(`${apiEndPoint}/auth/teacher`, body);
  }

  changePassword(password, newPassword){
    const body = {
      Password: password,
      NewPassword: newPassword
    };

    return this.http.put<any>(`${apiEndPoint}/auth/change-password`, body);
  }

  refreshToken(){
    return this.http.post<any>(`${apiEndPoint}/auth/refresh-token`, {RefreshToken: localStorage.getItem('os_auth_refresh')});
  }
}
