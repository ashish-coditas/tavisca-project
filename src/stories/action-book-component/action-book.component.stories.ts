import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import '../../web-components';
import { ActionBookComponent } from './action-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorybookMock } from '../storybookMocks';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

storiesOf('Action Book', module)
  .addDecorator(moduleMetadata({
    declarations: [
      ActionBookComponent
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
  .add('Add Book', () => ({
    component: ActionBookComponent,
    props: {
      title: 'Action Book',
      onClose: actionsData.onClose,
      getData: actionsData.getData,
      bookForm: StorybookMock.getBookFormMock(),
      editNew: 'New',
      onSubmit: actionsData.onSubmit
    }
  })
  )
  .add('Update Book', () => ({
    component: ActionBookComponent,
    props: {
      title: 'Action Book',
      onClose: actionsData.onClose,
      getData: actionsData.getData,
      editData: {
        id: null,
        title: '',
        subtitle: '',
        author: '',
        published: '',
        publisher: '',
        pages: '',
        description: '',
        website: '',
        createdBy: '',
      },
      bookForm: StorybookMock.getBookFormMock(),
      editNew: 'Edit',
      onSubmit: actionsData.onSubmit
    }
  })
  );


export const actionsData = {
  onClose: action('close'),
  getData: action('get data'),
  onSubmit: action('submit')
};