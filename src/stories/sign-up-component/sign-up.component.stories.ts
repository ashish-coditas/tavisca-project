import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import '../../web-components';
import { SignUpComponent } from './sign-up.component';
import { StorybookMock } from '../storybookMocks';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { withKnobs, text, number, boolean, array, select, radios, color, date, button } from '@storybook/addon-knobs';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

storiesOf('User SignUp', module)
.addDecorator(withKnobs)
  .addDecorator(moduleMetadata({
    declarations: [
      SignUpComponent
    ],
    imports: [
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: 'en'
      }),
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
  }))
  .add('Sign up', () => ({
    component: SignUpComponent,
    props: {
      title: 'Signup',
      submitted: false,
      registerForm: StorybookMock.getSignUpFormMock(),
      onLoginNavigate: actionsData.onLoginNavigate,
      onSubmit: actionsData.onSubmit,
    }
  }))
  .add('registration feild', () => ({
    component: SignUpComponent,
    props: {
      email: text('email', ''),
      password: text('password', ''),
      firstName: text('firstName', ''),
      lastName: text('lastName', '')
    },
  })
  );


  export const actionsData = {
    onLoginNavigate: action('/login'),
    onSubmit: action('submit')
  };