import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { ApiServiceService } from '../../service/api/api-service.service';
import {
  UserActionTypes,
  LogInSuccess,
  LogInFailure,
  LogIn,
  SignUp,
  SignUpSuccess,
  SignUpFailure,
} from '../actions/user-actions';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private apiService: ApiServiceService,
    private router: Router
  ) {}


  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload) => {
      return this.apiService.login(payload).pipe(
        map((user) => {
          const userData = new User();
          userData.email = payload.email;
          userData.accessToken = user;
          return new LogInSuccess(userData);
        }),
        catchError((error) => {
          return of(new LogInFailure({ error: error.error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      this.apiService.setToken(user.payload.accessToken.accessToken , user.payload.email);
      this.router.navigate(['/books']);
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.SIGNUP),
      map((action: SignUp) => action.payload),
      switchMap(payload => {
        return this.apiService.register(payload).pipe(
          map((user) => {
            return new SignUpSuccess(user);
          }),
          catchError((error) => {
            return of(new SignUpFailure({  error: error.error }));
          })
          );
      })
  );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      this.router.navigate(['/login']);
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.SIGNUP_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOGOUT),
    tap(() => {
      this.apiService.removeToken();
      this.router.navigate(['/login']);
    })
  );
}
