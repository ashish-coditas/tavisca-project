import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app-state';
import { LogIn } from '../../store/actions/user-actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild("myinput") myInputField: ElementRef;

  loginForm: FormGroup;
  submitted: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.store.dispatch(new LogIn(payload));
  }

  onRegisterNavigate() {
    this.router.navigate(['/sign-up']);
  }

  onEmailInput(text) {
    this.loginForm.controls['email'].setValue(text);
  }

  onPasswordInput(text) {
    this.loginForm.controls['password'].setValue(text);
  }

  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }
}
