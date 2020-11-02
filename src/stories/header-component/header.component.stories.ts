import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import '../../web-components';
import { HeaderComponent } from './header.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

storiesOf('Header component', module)
  .addDecorator(moduleMetadata({
    declarations: [
      HeaderComponent
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
      HttpClientModule
      ],
      providers: [

          TranslateService
       ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
  }))
  .add('logout', () => ({
    component: HeaderComponent,
    props: {
        title: 'Header Component',
        switchLanguage: action('fr'),
        onLogout: action('dispatch')
    }
  }));