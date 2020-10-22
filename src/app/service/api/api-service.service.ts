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


  setToken(token) {
    sessionStorage.setItem('token', token);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  removeToken() {
    sessionStorage.clear();
  }
}
