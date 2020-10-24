import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';
import {
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ApiServiceService } from '../../service/api/api-service.service';
import { BookService } from '../../service/book-service/book.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { StoreMocks } from '../../store/mockStore';
import { ActionBookComponent } from '../action-book/action-book.component';
import { DeleteComponent } from '../delete/delete.component';

xdescribe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let bookService: BookService;
  let apiService: ApiServiceService;

  beforeEach(async() => {
  await TestBed.configureTestingModule({
     declarations: [
      BooksComponent,
      ActionBookComponent,
       DeleteComponent
      ]
      ,
     imports: [
       TranslateModule.forRoot(),
       FormsModule, ReactiveFormsModule,
       BrowserModule, BrowserAnimationsModule,
       RouterTestingModule, HttpClientModule,
     ],

    providers: [
      ApiServiceService, BookService,
      {
        provide: Store, useValue: StoreMocks.getMockStoreService()
      }
     ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    })
    .compileComponents();
  });

  beforeEach(() => {
    apiService = TestBed.get(ApiServiceService);
    bookService = TestBed.get(BookService);
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data', async(() => {
    spyOn(bookService, 'getBook').and.returnValue(of({
      id: '9781593275846',
      title: 'Eloquent JavaScript, Second Edition',
      subtitle: 'A Modern Introduction to Programming',
      author: 'Marijn',
      published: '2014-12-14',
      publisher: 'No Starch Press',
      pages: 472,
      description: 'JavaScript',
      website: 'http://eloquentjavascript.net/'
    }));
    component.getBookData();
    expect(bookService.getBook).toHaveBeenCalled();
  }));


  it('should return edit by data', async(() => {
    spyOn(bookService, 'getBookById').and.returnValue(of({
      id: '9781593275846',
      title: 'Eloquent JavaScript, Second Edition',
      subtitle: 'A Modern Introduction to Programming',
      author: 'Marijn',
      published: '2014-12-14',
      publisher: 'No Starch Press',
      pages: 472,
      description: 'JavaScript',
      website: 'http://eloquentjavascript.net/'
    }));
    component.onEdit('9781593275846');
    expect(bookService.getBookById).toHaveBeenCalled();
  }));

  it('should delete data', async(() => {
    spyOn(bookService, 'deleteBookById').and.returnValue(of({
    }));
    component.onEdit('9781593275846');
    expect(bookService.deleteBookById).toHaveBeenCalled();
  }));

});
