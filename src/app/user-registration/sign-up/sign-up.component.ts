import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SignUp } from '../../store/actions/user-actions';
import { AppState } from '../../store/state/app-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;
  submitted:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const payload = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName
    };
    this.store.dispatch(new SignUp(payload));
  }

  onLoginNavigate() {
    this.router.navigate(['/login']);
  }

  onFirstNameInput(text) {
    this.registerForm.controls['firstName'].setValue(text);
  }

  onLastNameInput(text) {
    this.registerForm.controls['lastName'].setValue(text);
  }

  onEmailInput(text) {
    this.registerForm.controls['email'].setValue(text);
  }

  onPasswordInput(text) {
    this.registerForm.controls['password'].setValue(text);
  }
}
