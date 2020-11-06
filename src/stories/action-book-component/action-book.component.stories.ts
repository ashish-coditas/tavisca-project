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
import { withKnobs, text, number, boolean, array, select, radios, color, date, button } from '@storybook/addon-knobs';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

storiesOf('Action Book', module)
.addDecorator(withKnobs)
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
      onClose: actionsData.onClose,
      getData: actionsData.getData,
      bookForm: StorybookMock.getBookFormMock(),
      editNew: 'New',
      onSubmit: actionsData.onSubmit,
      isbn: text('id', '9781449337711' , 'disabled'),
      title: text('title', 'Designing Evolvable Web APIs with ASP.NE'),
      subtitle: text('subtitle', 'Harnessing the Power of the Web'),
      author: text('author', 'Glenn Block, et al'),
      published: text('published', '2014-04-07'),
      publisher: text('publisher', "O'Reilly Media"),
      pages: number('page', 242),
      description: text('description', 'Design and build Web APIs for a broad range'),
      website: text('website', 'http://chimera.labs.oreilly.com/books/1234000001708/index.html'),
      createdBy: text('createdBy', 'ashish.kapri@gmail,com', 'disabled'),
      cancel: text('Cancel', 'Cancel'),
      cancelButton: color('cancelButton', '#FFFFF'),
      save: text('Save', 'Save'),
      saveButton: color('saveButton', '#4CAF50')
    }
  })
  )
  .add('Update Book', () => ({
    component: ActionBookComponent,
    props: {
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
      onSubmit: actionsData.onSubmit,
      isbn: text('id', '9781449337711' , 'disabled'),
      title: text('title', 'Designing Evolvable Web APIs with ASP.NE'),
      subtitle: text('subtitle', 'Harnessing the Power of the Web'),
      author: text('author', 'Glenn Block, et al'),
      published: text('published', '2014-04-07'),
      publisher: text('publisher', "O'Reilly Media"),
      pages: number('page', 242),
      description: text('description', 'Design and build Web APIs for a broad range'),
      website: text('website', 'http://chimera.labs.oreilly.com/books/1234000001708/index.html'),
      createdBy: text('createdBy', 'ashish.kapri@gmail,com', 'disabled'),
      cancel: text('Cancel', 'Cancel'),
      cancelButton: color('cancelButton', '#FFFFF'),
      save: text('Save', 'Save'),
      saveButton: color('saveButton', '#4CAF50')
    }
  })
  );


export const actionsData = {
  onClose: action('close'),
  getData: action('get data'),
  onSubmit: action('submit')
};