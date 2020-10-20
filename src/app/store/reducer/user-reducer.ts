import { UserActions, UserActionTypes } from '../actions/user-actions';
import { User } from '../../models/user.model';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;

}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          email: action.payload.email
        },
        errorMessage: 'Success'
      };
    }
    case UserActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload
      };
    }
    case UserActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        user: {
          email: action.payload.email
        },
        errorMessage: 'User Created'
      };
    }
    case UserActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload
      };
    }
    case UserActionTypes.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}


