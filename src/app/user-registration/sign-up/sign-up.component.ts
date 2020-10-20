import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { AppState, selectAuthState } from '../../store/state/app-state';
import { Store } from '@ngrx/store';
import { SignUp } from '../../store/actions/user-actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  user: User = new User();
  getState: Observable<any>;
  errorResponse: any;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastService: ToastrService

  ) {
    this.getState = this.store.select(selectAuthState);
    this.getState.subscribe((state) => {
      this.errorResponse = state.errorMessage;
      if (this.errorResponse !== null) {
        if (this.errorResponse === 'Success') {
          this.toastService.success('Registered Successfully');
        } else {
          this.toastService.info(this.errorResponse.error);
        }
      }
    });
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

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }


    this.loading = true;
    const payload = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName
    };
    this.store.dispatch(new SignUp(payload));
  }
}
