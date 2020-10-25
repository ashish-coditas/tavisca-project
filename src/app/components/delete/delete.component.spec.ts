import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComponent } from './delete.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

describe('DeleteComponent', () => {
  let component: DeleteComponent;
  let fixture: ComponentFixture<DeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        TranslateService
      ],
      imports: [TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
