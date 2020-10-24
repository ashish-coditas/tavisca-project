import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ThemeService } from '../../service/theme.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app-state';
import { StoreMocks } from '../../store/mockStore';



describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store<AppState>;

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
    fixture.detectChanges();
  });
  
  test('logout', () => {
    const logoutSpy = spyOn(component['store'], 'dispatch');
    component.onLogout();
    expect(logoutSpy).toHaveBeenCalled();
  });
});



