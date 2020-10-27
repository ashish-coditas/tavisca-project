import { User } from '../../models/user.model';
import { LogInSuccess, LogInFailure, SignUpSuccess, SignUpFailure, LogOut } from '../actions/user-actions';
import { initialState, reducer } from '../reducer/user-reducer';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';

describe('Auth Effect', () => {
    const mockUser: User = {
        id: '1',
        email: 'Anakin@gmail.com',
        accessToken: 'Skywalker',
        password: '123456'
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                HttpTestingController,
            ],
            imports: []
        });
    });


    it('should create the default state', () => {
        const action = { type: 'HELLO' } as any;
        const result = reducer(undefined, action);
        expect(result).toBe(initialState);
    });

    it('should create login success', () => {
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

    it('should create login failure', () => {
        const action = new LogInFailure(mockUser);
        const result = reducer(initialState, action);
        expect(result).toEqual({
            ...initialState,
            responseMessage: action.payload,
        });
    });

    it('should create signup failure', () => {
        const action = new SignUpFailure(mockUser);
        const result = reducer(initialState, action);
        expect(result).toEqual({
            ...initialState,
            responseMessage: action.payload,
        });
    });

    it('it should create logout', () => {
        const action = new LogOut();
        const result = reducer(initialState, action);
        expect(result).toEqual({
            ...initialState,
        });
    });

    it('should create signup sucess', () => {
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