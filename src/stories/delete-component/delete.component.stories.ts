import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DeleteComponent } from './delete.component';
import '../../web-components';
import { withKnobs, text, number, boolean, array, select, radios, color, date, button } from '@storybook/addon-knobs';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

storiesOf('DeleteModal', module)
  .addDecorator(withKnobs)
  .addDecorator(moduleMetadata({
    declarations: [
      DeleteComponent
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }))
  .add('with action', () => ({
    component: DeleteComponent,
    props: {
      title: 'Delete Component',
      onClose: action('closeModal'),
      onDelete: action('delete'),
      cancel: text('Cancel', 'Cancel'),
      cancelButton: color('cancelButton', '#FFFFF'),
      
      delete: text('delete', 'delete'),
      deleteButton: color('deleteButton', '#4CAF50')
    }
  }));