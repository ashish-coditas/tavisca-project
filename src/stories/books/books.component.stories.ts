import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import '../../web-components';
import { BooksComponent } from './books.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

storiesOf('List Of Book Data', module)
  .addDecorator(moduleMetadata({
    declarations: [
      BooksComponent
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
  .add('Load Book data', () => ({
    component: BooksComponent,
    props: {
      title: 'Book Component',
      openFormModal: false,
      deleteForm: false,
      columns: [
        { key: 'HEADER_TEXT_1', title: 'title' },
        { key: 'HEADER_TEXT_2', title: 'author' },
        { key: 'HEADER_TEXT_3', title: 'website' },
        { key: 'HEADER_TEXT_4', title: 'publisher' },
      ],
      bookData: [{
        "id": "9781449337711",
        "title": "Designing Evolvable Web APIs with ASP.NET",
        "subtitle": "Harnessing the Power of the Web",
        "author": "Glenn Block, et al.",
        "published": "2014-04-07",
        "publisher": "O'Reilly Media",
        "pages": 538,
        "description": "Design and build Web APIs for a broad range of",
        "website": "http://chimera.labs.oreilly.com/books/1234000001708/index.html",
        "createdBy": "ashish.kapri@gmail.com"
      }],
      onDelete: action('delete called'),
      onEdit: action('edit called'),
      addBook: action('open')
    }
  })
  )
  .add('Delete Book data', () => ({
    component: BooksComponent,
    props: {
      title: 'Book Component',
      openFormModal: false,
      deleteForm: true,
      columns: [
        { key: 'HEADER_TEXT_1', title: 'title' },
        { key: 'HEADER_TEXT_2', title: 'author' },
        { key: 'HEADER_TEXT_3', title: 'website' },
        { key: 'HEADER_TEXT_4', title: 'publisher' },
      ],
      bookData: [{
        "id": "9781449337711",
        "title": "Designing Evolvable Web APIs with ASP.NET",
        "subtitle": "Harnessing the Power of the Web",
        "author": "Glenn Block, et al.",
        "published": "2014-04-07",
        "publisher": "O'Reilly Media",
        "pages": 538,
        "description": "Design and build Web APIs for a broad range of",
        "website": "http://chimera.labs.oreilly.com/books/1234000001708/index.html",
        "createdBy": "ashish.kapri@gmail.com"
      }],
      onDelete: action('delete called'),
      onEdit: action('edit called'),
      addBook: action('open')

    }
  })
  )
  .add('Edit Book data', () => ({
    component: BooksComponent,
    props: {
      title: 'Book Component',
      openFormModal: true,
      deleteForm: false,
      columns: [
        { key: 'HEADER_TEXT_1', title: 'title' },
        { key: 'HEADER_TEXT_2', title: 'author' },
        { key: 'HEADER_TEXT_3', title: 'website' },
        { key: 'HEADER_TEXT_4', title: 'publisher' },
      ],
      editFormData: {
        "id": "9781449337711",
        "title": "Designing Evolvable Web APIs with ASP.NET",
        "subtitle": "Harnessing the Power of the Web",
        "author": "Glenn Block, et al.",
        "published": "2014-04-07",
        "publisher": "O'Reilly Media",
        "pages": 538,
        "description": "Design and build Web APIs for a broad range of",
        "website": "http://chimera.labs.oreilly.com/books/1234000001708/index.html",
        "createdBy": "ashish.kapri@gmail.com"
      },
      bookData: [{
        "id": "9781449337711",
        "title": "Designing Evolvable Web APIs with ASP.NET",
        "subtitle": "Harnessing the Power of the Web",
        "author": "Glenn Block, et al.",
        "published": "2014-04-07",
        "publisher": "O'Reilly Media",
        "pages": 538,
        "description": "Design and build Web APIs for a broad range of",
        "website": "http://chimera.labs.oreilly.com/books/1234000001708/index.html",
        "createdBy": "ashish.kapri@gmail.com"
      }],
      onDelete: action('delete called'),
      onEdit: action('edit called'),
      addBook: action('open')
    }
  })
  );