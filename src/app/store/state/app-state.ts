import { createFeatureSelector } from '@ngrx/store';
import * as ActionReducer from './../reducer/user-reducer';



export interface AppState {
  authState: ActionReducer.State;
}

export const reducers = {
  auth: ActionReducer.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
