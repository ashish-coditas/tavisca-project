import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { ThemeService } from '../../service/theme.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app-state';
import { StoreMocks } from '../../common/mock/mock-store';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store<AppState>;
  let translate: TranslateService;
  let injector:  Injector;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [TranslateModule.forRoot(),
  FormsModule
      ],
      providers: [TranslateService, ThemeService,
       { provide: Store, useValue: StoreMocks.getMockStoreService()}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    translate = injector.get(TranslateService);
    fixture.detectChanges();
    
  });
  
  it('should logout on click', () => {
    const logoutSpy = spyOn(component['store'], 'dispatch');
    component.onLogout();
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should switch language', () => {
    component.switchLanguage('en');
    translate.use('en');
  });

  it('should switch dark theme', () => {
    component.onChangeTheme(true);
    component.setdark(true);
    component.onChangeTheme(false);
    component.setdark(false);
  });
});



