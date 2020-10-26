import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';
import {
  TranslateModule,
} from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA} from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../../service/api/api-service.service';
import { BookService } from '../../service/book-service/book.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { StoreMocks } from '../../store/mockStore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(async() => {
  await TestBed.configureTestingModule({
     declarations: [
      BooksComponent,
    ]
      ,
     imports: [
      HttpClientModule,
       TranslateModule.forRoot(),
       BrowserAnimationsModule,
       ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-center',
        preventDuplicates: false,
      }),
     ],

    providers: [
      {
        provide: ApiServiceService, useValue: StoreMocks.getApiService()
      },
      {
        provide: BookService, useValue: StoreMocks.getBookService()
      },
      ToastrService
     ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data', async(() => {
    const response = [];
    const booksData = spyOn(component['bookService'], 'getBook').and.returnValue(of(response));
    component.getBookData();
    expect(booksData).toHaveBeenCalled();
  }));


  it('should delete data', async(() => {
    const deleteData = spyOn(component['bookService'], 'deleteBookById').and.returnValue(of('8878'));
    component.deleteBook();
    expect(deleteData).toHaveBeenCalled();
  }));

  it('should  edit data on get by id data', async(() => {
    const editData = spyOn(component['bookService'], 'getBookById').and.returnValue(of('8878'));
    component.onEdit('8878');
    expect(editData).toHaveBeenCalled();
  }));


  it('should call delete function', async(() => {
    component.onDelete('8878');
    expect(component.deleteForm).toBe(true);
    expect(component.deleteId).toBe('8878');
  }));

  it('should call addBook function', async(() => {
    component.addBook();
    expect(component.openFormModal).toBe(true);
  }));

  it('should call closeFormModal function', async(() => {
    component.closeFormModal();
    expect(component.editFormData).toEqual({});
    expect(component.openFormModal).toBe(false);
  }));

  it('should call closeModal function', async(() => {
    component.closeModal();
    expect(component.deleteForm).toBe(false);
  }));

  it('should call closeModal function', async(() => {
    component.getData();
    expect(component.bookData.length).toBe(1);
  }));
});
