import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { StoreMocks } from './store/mockStore';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const initialState = {
    auth: {
      isAuthenticated: false,
      responseMessage: null,
      user: null
    }
   
  }
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, TranslateModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
         timeOut: 3000,
         positionClass: 'toast-top-center',
         preventDuplicates: false,
       }),
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore({initialState}) ,
        TranslateService,
        ToastrService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    }).compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test(`should have as title 'tavsica-project'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tavsica-project');
  });

  test('initilized store null', () => {
  
    component.getResponseData();
    expect(component.response).toBe(null);
  });

  test(' store not null', () => {
    component.getResponseData();
    expect(initialState.auth.isAuthenticated).toBe(false);
    initialState.auth.isAuthenticated = true;
    expect(initialState.auth.isAuthenticated).toBe(true);
  });
});
