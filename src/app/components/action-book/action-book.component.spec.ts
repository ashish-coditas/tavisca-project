import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBookComponent } from './action-book.component';

describe('ActionBookComponent', () => {
  let component: ActionBookComponent;
  let fixture: ComponentFixture<ActionBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
