import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import {
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroupDirective } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActionBookComponent } from './action-book.component';
import { ApiServiceService } from '../../service/api/api-service.service';
import { BookService } from '../../service/book-service/book.service';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { StoreMocks } from '../../store/mockStore';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


xdescribe('ActionBookComponent', () => {
  let component: ActionBookComponent;
  let fixture: ComponentFixture<ActionBookComponent>;
  let bookService: BookService;
  let apiService: ApiServiceService;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ActionBookComponent],
      imports: [
        ReactiveFormsModule, ToastrModule.forRoot(),
        HttpClientModule , TranslateModule,RouterTestingModule
      ],
      providers: [
        BookService, ApiServiceService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    apiService = TestBed.get(ApiServiceService);
    bookService = TestBed.get(BookService);
    fixture = TestBed.createComponent(ActionBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method on form submit', async(() => {
    component.bookForm.controls['id'].setValue("");
    component.bookForm.controls['title'].setValue("1232323");
    component.bookForm.controls['subtitle'].setValue('ssss@ssss.com');
    component.bookForm.controls['author'].setValue( 'ssss.com');
    component.bookForm.controls['published'].setValue('sub_name');
    component.bookForm.controls['publisher'].setValue('uan');
    component.bookForm.controls['pages'].setValue('sss');
    component.bookForm.controls['description'].setValue('sss');
    component.bookForm.controls['website'].setValue('ssss');
    component.bookForm.controls['createdBy'].setValue('eee@gmail.com');
    component.onSubmit(component.bookForm.value);
  }));

  it('should call edit method on form submit', async(() => {
    component.bookForm.controls['id'].setValue("w2222");
    component.bookForm.controls['title'].setValue("1232323");
    component.bookForm.controls['subtitle'].setValue('ssss@ssss.com');
    component.bookForm.controls['author'].setValue( 'ssss.com');
    component.bookForm.controls['published'].setValue('sub_name');
    component.bookForm.controls['publisher'].setValue('uan');
    component.bookForm.controls['pages'].setValue('sss');
    component.bookForm.controls['description'].setValue('sss');
    component.bookForm.controls['website'].setValue('ssss');
    component.bookForm.controls['createdBy'].setValue('eee@gmail.com');
    component.onSubmit(component.bookForm.value);
  }));
});
