import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  handleError: any;
  constructor(private http: HttpClient) {}

  login(user): Observable<any> {
    return this.http
      .post<User>(environment.loginURL, user);
  }

  register(user): Observable<any> {
    return this.http.post<User>(environment.registrationURL, user);
  }


  setToken(token, email) {
    const userData = {
      token,
      email
    };
    userData.token = token;
    userData.email = email;
    sessionStorage.setItem('userToken', JSON.stringify(userData));
  }

  getToken() {
    return JSON.parse(sessionStorage.getItem('userToken'));
  }

  removeToken() {
    sessionStorage.clear();
  }
}
