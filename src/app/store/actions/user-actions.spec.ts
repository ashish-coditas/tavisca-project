import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as UserAction from '../actions/user-actions';
import { User } from '../../models/user.model';

describe('User Actions', () => {

  const user = { id: '1', email: 'Test@gmail.com', password:'1234567', accessToken:'adsfsdfsdf' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  it('should create LogIn Action', () => {
    const payload = <User>user
    const action = new UserAction.LogIn(payload);
    expect(action.type).toBe('[User] Login');
    expect(action.payload).toEqual(user);
  });

  it('should Load Success Action', () => {
    const payload = <User>user,
    action = new UserAction.LogInSuccess(payload);
    expect(action.type).toBe('[User] Login Success');
    expect(action.payload).toEqual(user);
  });

    it('Login Fail Action', () => {
        const payload = <User>user,
        action = new UserAction.LogInFailure(payload);
      expect(action.type).toBe('[User] Login Failure');
      expect(action.payload).toEqual(user);
    });
  
  it('should register user', () => {
    const payload = <User>user,
    action = new UserAction.SignUp(payload);
    expect(action.type).toBe('[User] Signup');
    expect(action.payload).toEqual(user);
  });
    
  it('should show sccess user', () => {
    const payload = <User>user,
      action = new UserAction.SignUpSuccess(payload);
    expect(action.type).toBe('[User] Signup Success');
    expect(action.payload).toEqual(user);
  });
  
  it('should show failed user', () => {
    const payload = <User>user,
      action = new UserAction.SignUpFailure(payload);
    expect(action.type).toBe('[User] Signup Failure');
    expect(action.payload).toEqual(user);
        });
    
  it('should logout', () => {
    const action = new UserAction.LogOut();
    expect(action.type).toBe('[User] Logout');
  });  
});