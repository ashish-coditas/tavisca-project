import { User } from '../../models/user.model';
import { LogInSuccess,LogInFailure,SignUp,SignUpSuccess,SignUpFailure,LogOut } from '../actions/user-actions';
import { initialState, reducer } from '../reducer/user-reducer';


describe('User Reducer', () => {
    const mockUser: User = {
        id: '1',
        email: 'Anakin@gmail.com',
        accessToken: 'Skywalker',
        password: '123456'
    };
  
    describe('undefined action', () => {
        it('should return the default state', () => {
            const action = { type: 'HELLO' } as any;
            const result = reducer(undefined, action);
  
            expect(result).toBe(initialState);
        });
    });

    describe('LOGIN_SUCCESS', () => {
        it('should have an error', () => {
            const action = new LogInSuccess(mockUser);
            const result = reducer(initialState, action);
            expect(result).toEqual({
                ...initialState,
                isAuthenticated: true,
                user: {
                    email: action.payload.email
                },
                responseMessage: 'Success',
            });
        });
    });

    describe('LOGIN_FAILURE', () => {
        it('should have an error and no pending state', () => {
            const action = new LogInFailure(mockUser);
            const result = reducer(initialState, action);
            expect(result).toEqual({
                ...initialState,
                responseMessage: action.payload,
            });
        });
    });

    describe('SIGNUP_FAILURE', () => {
        it('should have an error', () => {
            const action = new SignUpFailure(mockUser);
            const result = reducer(initialState, action);
            expect(result).toEqual({
                ...initialState,
                responseMessage: action.payload,
            });
        });
    });

    describe('LOGOUT', () => {
        it('LOGOUT', () => {
            const action = new LogOut();
            const result = reducer(initialState, action);
            expect(result).toEqual({
                ...initialState,
            });
        });
    });

    describe('SIGNUP_SUCCESS', () => {
        it('should have an error', () => {
            const action = new SignUpSuccess(mockUser);
            const result = reducer(initialState, action);
            expect(result).toEqual({
                ...initialState,
                isAuthenticated: false,
                user: {
                    email: action.payload.email
                },
                responseMessage: 'User Created',
            });
        });
    });
});