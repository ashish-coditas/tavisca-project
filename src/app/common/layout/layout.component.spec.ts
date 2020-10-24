import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

import {
  TranslateModule, TranslateService,
} from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../service/theme.service';
import { Store } from '@ngrx/store';
import { StoreMocks } from '../../store/mockStore';



describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent , FooterComponent , HeaderComponent],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        FormsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [TranslateService, ThemeService,
        { provide: Store, useValue: StoreMocks.getMockStoreService() }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
