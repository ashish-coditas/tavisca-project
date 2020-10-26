import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from './store/state/app-state';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tavsica-project';
  getState: Observable<any>;
  response: any;
  constructor(
    public translate: TranslateService,
    private store: Store<AppState>,
    private toastService: ToastrService
  ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getResponseData();
  }

  getResponseData() {
    this.getState.subscribe((state) => {
      this.response = state.responseMessage;
      if (this.response !== null) {
        if (state.isAuthenticated) {
            this.toastService.success('Logged In Successfully');
        } else if (this.response === 'User Created') {
          this.toastService.info('User Registered Successfully');
        } else {
          this.toastService.info(this.response.error);
        }
      }
    });
  }
}
