import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed, inject } from '@angular/core/testing';
import { ApiServiceService } from '../../service/api/api-service.service';
import { cold, hot } from 'jasmine-marbles';
import { Observable, empty } from 'rxjs';
import { LogIn, LogInSuccess, LogInFailure, SignUp, SignUpSuccess, SignUpFailure, LogOut } from '../actions/user-actions';
import { AuthEffects } from '../effect/user-effect';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpTestingController } from '@angular/common/http/testing';

describe('Auth Effect', () => {
    let actions: Observable<any>;
    let effects: AuthEffects;
    let apiService: ApiServiceService;
    let router: Router;
    let httpMock: HttpTestingController;
    let service: ApiServiceService;
    const mockUser = { email: 'ak@gmail.com', password: '123456' }
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                AuthEffects,
                HttpTestingController,
                provideMockActions(() => actions), {
                    provide: ApiServiceService,
                    useValue: {
                        login: jest.fn(),
                        registerUser: jest.fn(),
                    }
                }
            ],
            imports: [RouterTestingModule]
        });

        effects = TestBed.get(AuthEffects);
        apiService = TestBed.get(ApiServiceService);
    });


    beforeEach(
        inject([ApiServiceService, HttpTestingController], (service$, httpMock$) => {
            service = service$;
            httpMock = httpMock$;
        }));


    it('effect should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('should return an LogInSuccess action, with the user, on success', () => {
        const action = new LogIn(mockUser);
        const error = new Error();
        const outcome = new LogInFailure({ error });
        actions = hot('-a|', { a: action });
        const response = cold('-a|', { a: mockUser });
        const expected = cold('--b|', { b: outcome });
        apiService.login = jest.fn(() => response);
        effects.LogIn.subscribe(actionSent => {
            expect(actionSent).toBeObservable(expected)
            actionSent();
        });
    });

    it('should navigate and remove related data from session storage', () => {
        const action = new LogOut();
        const actions$ = cold('-a|', { a: action });
        effects.LogOut.subscribe(actionSent => {
            expect(actionSent).toBeObservable(actions$);
            expect(apiService.removeToken).toBe(0);
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
            actionSent();
        })

    });

    it('should sign up', () => {
        const action = new SignUp(mockUser);
        const outcome = new SignUp(mockUser);
        actions = hot('-a', { a: action });
        const response = cold('-a|', { a: mockUser });
        const expected = cold('--b', { b: outcome });
        apiService.register = jest.fn(() => response);
        effects.SignUp.subscribe(actionSent => {
            expect(actionSent).toBeObservable(expected)
            actionSent();
        })
    });

    it('should navigate to login on sign up success', () => {
        const action = new SignUpSuccess(mockUser);
        const actions$ = cold('-a', { a: action });
        effects.SignUpSuccess.subscribe(actionSent => {
            expect(actionSent).toBeObservable(actions$);
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
            actionSent();
        });
    });

    it('registration sucess', () => {
        const action = new SignUpSuccess(mockUser);
        const actions$ = cold('-a', { a: action });
        effects.SignUpSuccess.subscribe(actionSent => {
            expect(actionSent).toBeObservable(actions$);
            actionSent();
        })
    });

    it('registration failure', () => {
        const action = new SignUpFailure(mockUser);
        const actions$ = cold('-a', { a: action });
        effects.SignUpFailure.subscribe(actionSent => {
            expect(actionSent).toBeObservable(actions$);
            actionSent();
        })
    });

    it('login failed', () => {
        const action = new LogInFailure(mockUser);
        const actions$ = cold('-a', { a: action });
        effects.LogInFailure.subscribe(actionSent => {
            expect(actionSent).toBeObservable(actions$);
            actionSent();
        })
    });

    it('login sucess', () => {
        const action = new LogInSuccess(mockUser);
        const actions$ = cold('-a', { a: action });
        effects.LogInSuccess.subscribe(actionSent => {
            expect(actionSent).toBeObservable(actions$);
            expect(apiService.setToken('abcsdfsdfs', 'al@gmail.com')).toHaveBeenCalledWith();
            expect(router.navigate).toHaveBeenCalledWith(['/books']);
            actionSent();
        })
    });
});