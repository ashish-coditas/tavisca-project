import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import '../../web-components';
import { FooterComponent } from './footer.component';
import { withKnobs, text, number, boolean, array, select, radios, color, date, button } from '@storybook/addon-knobs';
import { linkTo, hrefTo } from '@storybook/addon-links'

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

storiesOf('Footer', module)
.addDecorator(withKnobs)
  .addDecorator(moduleMetadata({
    declarations: [
      FooterComponent
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
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
  }))
  .add('footer with text', () => ({
    component: FooterComponent,
    props: {
      author: text('Author', 'Ashish Kapri'),
      email: hrefTo('ashish.kapri@coditas.com', 'ashish.kapri@coditas.com')
    }
  }));