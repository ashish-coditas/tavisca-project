import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books/books.component';
import { BookRoutingModule } from './book-routing.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActionBookComponent } from './action-book/action-book.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DeleteComponent } from './delete/delete.component';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    BooksComponent,
    ActionBookComponent,
    DeleteComponent
  ],
  imports: [
  CommonModule,
    BookRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class BookModule { }
