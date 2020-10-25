import * as UserAction from '../actions/user-actions';
import { User } from '../../models/user.model';

describe('Customer Actions', () => {
  const user = { id: '1', email: 'Test@gmail.com', password:'1234567', accessToken:'adsfsdfsdf' };

  describe('LogIn User', () => {
      test('should create LogIn Action', () => {
        const payload = <User>user
        const action = new UserAction.LogIn(payload);
        expect(action.type).toBe('[User] Login');
        expect(action.payload).toEqual(user);
    });
  });

  describe('Load LogInSuccess', () => {
    test('should Load Success Action', () => {
      const payload = <User>user,
        action = new UserAction.LogInSuccess(payload);
      expect(action.type).toBe('[User] Login Success');
      expect(action.payload).toEqual(user);
    });
  });

  describe('Load LogInFailure', () => {
    test('Login Fail Action', () => {
        const payload = <User>user,
        action = new UserAction.LogInFailure(payload);
      expect(action.type).toBe('[User] Login Failure');
      expect(action.payload).toEqual(user);
    });
  });

  describe('SignUp user', () => {
    test('should register user', () => {
    const payload = <User>user,
    action = new UserAction.SignUp(payload);
    expect(action.type).toBe('[User] Signup');
    expect(action.payload).toEqual(user);
    });
      
  });
    
    describe('SignUp user suscess', () => {
        test('should show sccess user', () => {
        const payload = <User>user,
        action = new UserAction.SignUpSuccess(payload);
        expect(action.type).toBe('[User] Signup Success');
        expect(action.payload).toEqual(user);
        });

    });
    
    describe('SignUp user failed', () => {
        test('should show failed user', () => {
            const payload = <User>user,
            action = new UserAction.SignUpFailure(payload);
            expect(action.type).toBe('[User] Signup Failure');
            expect(action.payload).toEqual(user);
        });
    });
    
    
    describe('logout user', () => {
        test('should logout', () => {
            const action = new UserAction.LogOut();
            expect(action.type).toBe('[User] Logout');
        });
    });
  });