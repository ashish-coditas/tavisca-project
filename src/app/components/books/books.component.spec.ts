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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreMocks } from '../../common/mock/mock-store';

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

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should test get data', async(() => {
    const response = [];
    const spyGetBook = spyOn(component['bookService'], 'getBook').and.returnValue(of(response));
    component.getBookData();
    expect(spyGetBook).toHaveBeenCalled();
    expect(component.bookData.length).toBe(0);
  }));


  it('should test delete data', async(() => {
    const deleteData = spyOn(component['bookService'], 'deleteBookById').and.returnValue(of('8878'));
    component.deleteBook();
    expect(deleteData).toHaveBeenCalled();
  }));

  it('should test get data on get by id', async(() => {
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

  it('should call close book Form Modal function', async(() => {
    component.closeFormModal();
    expect(component.editFormData).toEqual({});
    expect(component.openFormModal).toBe(false);
  }));

  it('should call close delete Modal function', async(() => {
    component.closeModal();
    expect(component.deleteForm).toBe(false);
  }));

  it('should call close delete Modal', async(() => {
    component.getData();
    expect(component.bookData.length).toBe(1);
  }));
});
