import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http
      .post<User>(environment.loginURL, user);
  }

  register(user: User): Observable<any> {
    return this.http.post<User>(environment.registrationURL, user);
  }


  setToken(token: string, email: string) {
    const userData = {
      token,
      email
    };
    sessionStorage.setItem('userToken', JSON.stringify(userData));
  }

  getToken() {
    return JSON.parse(sessionStorage.getItem('userToken'));
  }

  removeToken() {
    sessionStorage.clear();
  }
}
