import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import '../../web-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorybookMock } from '../storybookMocks';
import { LoginComponent } from './login.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

storiesOf('User Login', module)
  .addDecorator(moduleMetadata({
    declarations: [
      LoginComponent
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }))
  .add('Login', () => ({
    component: LoginComponent,
    props: {
      title: 'Login',
      submitted: false,
      loginForm: StorybookMock.getLoginFormMock(),
      onRegisterNavigate: actionsData.onRegisterNavigate,
      onSubmit: actionsData.onSubmit,
    }
  })
  );


export const actionsData = {
  onRegisterNavigate: action('/sign-up'),
  onSubmit: action('submit')
};