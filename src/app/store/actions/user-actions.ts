import { User } from '../../models/user.model';
import { Action } from '@ngrx/store';

export enum UserActionTypes {
  LOGIN = '[User] Login',
  LOGIN_SUCCESS = '[User] Login Success',
  LOGIN_FAILURE = '[User] Login Failure',
  SIGNUP = '[User] Signup',
  SIGNUP_SUCCESS = '[User] Signup Success',
  SIGNUP_FAILURE = '[User] Signup Failure',
  LOGOUT = '[User] Logout',
  GET_STATUS = '[User] GetStatus'
}

export class LogIn implements Action {
  readonly type = UserActionTypes.LOGIN;
  constructor(public payload: User) {}
}
export class LogInSuccess implements Action {
  readonly type = UserActionTypes.LOGIN_SUCCESS;
  constructor(public payload: User) {}
}
export class LogInFailure implements Action {
  readonly type = UserActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class SignUp implements Action {
  readonly type = UserActionTypes.SIGNUP;
  constructor(public payload: any) {}
}

export class SignUpSuccess implements Action {
  readonly type = UserActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

export class SignUpFailure implements Action {
  readonly type = UserActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = UserActionTypes.LOGOUT;
}

export class GetStatus implements Action {
  readonly type = UserActionTypes.GET_STATUS;
}
export type UserActions = LogIn | LogInSuccess | LogInFailure | SignUp
| SignUpSuccess
| SignUpFailure
| LogOut
| GetStatus;
