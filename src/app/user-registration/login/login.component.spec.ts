import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreMocks } from '../../store/mockStore';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
      TranslateModule.forRoot(),
      FormsModule , ReactiveFormsModule
      ],
      providers: [TranslateService , {
        provide: Store, useValue: StoreMocks.getMockStoreService()
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('email field validity', () => {
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();
  });

  it('password field validity', () => {
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
  });

  it('submitting a form emits a user', () => {
    const logoutSpy = spyOn(component['store'], 'dispatch');
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['email'].setValue("test@test.com");
    component.loginForm.controls['password'].setValue("123456789");
    expect(component.loginForm.valid).toBeTruthy();

    component.onSubmit();
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('email field validity', () => {
    let errors = {};
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();

    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
  });
  
  it('password field validity', () => {
    let errors = {};
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue("tes");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });
  
  it('should set submitted to true', () => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });
});
