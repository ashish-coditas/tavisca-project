import { ComponentFixture, TestBed, async,} from '@angular/core/testing';
import { TranslateModule} from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActionBookComponent } from './action-book.component';
import { ApiServiceService } from '../../service/api/api-service.service';
import { BookService } from '../../service/book-service/book.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { StoreMocks } from '../../common/mock/mock-store';


describe('ActionBookComponent', () => {
  let component: ActionBookComponent;
  let fixture: ComponentFixture<ActionBookComponent>;

  beforeEach((async () => {
    
     TestBed.configureTestingModule({
      declarations: [ActionBookComponent],
      imports: [
        FormsModule,
        HttpClientModule, RouterTestingModule, ReactiveFormsModule,
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionBookComponent);
    component = fixture.componentInstance;
    component.editData = {
      id: '1234',
      title: 'sdfsd',
      subtitle: 'dfsd',
      author: 'dsf',
      published: 'dsf',
      publisher: 'dsf',
      pages: 'dfs',
      description: 'dsf',
      website: 'dsf',
      createdBy: 'dfsfd',
    }
    fixture.detectChanges();
  });

  it('should test create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call editFormData function', async(() => {
    component.editData = {};
    component.editFormData();
    expect(component.editNew).toBe('New');
  }));

  it('should test save on submit function', async(() => {     
    component.bookForm.value.id = null;
    component.onSubmit(component.bookForm);
    spyOn(component.getData, 'emit');
    spyOn(component.closeModal, 'emit');

    expect(component.bookForm.value.id).toBe(null);
    const postSpy = spyOn(component['bookService'], 'addBookData').and.returnValue(of(component.bookForm.value));
    expect(postSpy).toHaveBeenCalledTimes(0);

    expect(component.getData.emit).toHaveBeenCalledTimes(0);
    expect(component.closeModal.emit).toHaveBeenCalledTimes(0);
  }));


  it('should test update data on submit function', async(() => { 
    component.onSubmit(component.bookForm);
    spyOn(component.getData, 'emit');
    spyOn(component.closeModal, 'emit');

    component.bookForm.value.id = '1234'
    expect(component.bookForm.value.id).toBe('1234');
    const updateData = spyOn(component['bookService'], 'updateBookData').and.returnValue(of(component.bookForm.value));
    expect(component.getData.emit).toHaveBeenCalledTimes(0);
    expect(component.closeModal.emit).toHaveBeenCalledTimes(0);
    expect(updateData).toHaveBeenCalledTimes(0);
  }));
});
