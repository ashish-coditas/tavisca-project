import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreMocks } from '../../store/mockStore';


describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async() => {
   await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [TranslateModule.forRoot(),
      FormsModule , ReactiveFormsModule
      ],
     providers: [
       TranslateService,
        {
        provide: Store, useValue: StoreMocks.getMockStoreService()
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });
  
  it('email field validity', () => {
    let email = component.registerForm.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });

  it('password field validity', () => {
    let password = component.registerForm.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
  });

  it('firstName field validity', () => {
    let firstName = component.registerForm.controls['firstName'];
    expect(firstName.valid).toBeFalsy();

    firstName.setValue('');
    expect(firstName.hasError('required')).toBeTruthy();
  });

  it('lastName field validity', () => {
    let lastName = component.registerForm.controls['lastName'];
    expect(lastName.valid).toBeFalsy();

    lastName.setValue('');
    expect(lastName.hasError('required')).toBeTruthy();
  });

  it('submitting a form emits', () => {
    const logoutSpy = spyOn(component['store'], 'dispatch');
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['email'].setValue("test@test.com");
    component.registerForm.controls['password'].setValue("123456789");
    component.registerForm.controls['firstName'].setValue("test");
    component.registerForm.controls['lastName'].setValue("test");
    expect(component.registerForm.valid).toBeTruthy();

    component.onSubmit();
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('email field validity', () => {
    let errors = {};
    let email = component.registerForm.controls['email'];
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
    let password = component.registerForm.controls['password'];
    expect(password.valid).toBeFalsy();

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue("tes");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('firstName field validity', () => {
    let errors = {};
    let firstName = component.registerForm.controls['firstName'];
    expect(firstName.valid).toBeFalsy();

    errors = firstName.errors || {};
    expect(errors['required']).toBeTruthy();

    firstName.setValue("testtest");
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();

    firstName.setValue("testtest");
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();
  });
  
  it('lastName field validity', () => {
    let errors = {};
    let lastName = component.registerForm.controls['lastName'];
    expect(lastName.valid).toBeFalsy();

    errors = lastName.errors || {};
    expect(errors['required']).toBeTruthy();

    lastName.setValue("tes");
    errors = lastName.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('form invalid when empty', () => {
    component.registerForm.controls.firstName.setValue('');
    component.registerForm.controls.email.setValue('');
    component.registerForm.controls.lastName.setValue('');
    component.registerForm.controls.password.setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should set submitted to true', () => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('return f', () => {
    component.f['controls'];
  });
});
