import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/state/app-state';
import { Observable } from 'rxjs';
import { LogIn } from '../../store/actions/user-actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  getState: Observable<any>;
  errorResponse: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastService: ToastrService,
    private router: Router
  ) {
    this.getState = this.store.select(selectAuthState);
    this.getState.subscribe((state) => {
      this.errorResponse = state.errorMessage;
      if (this.errorResponse !== null) {
        if (this.errorResponse === 'Success') {
          this.toastService.success('Logged In Successfully');
        } else {
          this.toastService.info(this.errorResponse.error);
        }
      }
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.router.navigate(['/books']);


    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.store.dispatch(new LogIn(payload));
  }
}
