import { UserActions, UserActionTypes } from '../actions/user-actions';
import { User } from '../../models/user.model';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  responseMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  responseMessage: null,
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
        responseMessage: 'Success',
      };
    }
    case UserActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        responseMessage: action.payload
      };
    }
    case UserActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        user: {
          email: action.payload.email,
        },
        responseMessage: 'User Created'
      };
    }
    case UserActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        responseMessage: action.payload
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


