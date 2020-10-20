import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookService } from './service/book-service/book.service';
import { LayoutModule } from './common/layout.module';
import { BookModule } from './components/book.module';
import { ThemeService } from './service/theme.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LazyElementsModule } from '@angular-extensions/elements';
import { LoginComponent } from './user-registration/login/login.component';
import { SignUpComponent } from './user-registration/sign-up/sign-up.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effect/user-effect';
import { reducers } from './store/state/app-state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BookModule,
    LayoutModule,
    FormsModule,
    LazyElementsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers, {}),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
    }),
  ],
  providers: [BookService, ThemeService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
