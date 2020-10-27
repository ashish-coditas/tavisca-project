import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StoreMocks } from './mock-store';

describe('AppMocks', () => {
    let component: StoreMocks;;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
          {provide: StoreMocks, useValue: StoreMocks}
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    component = TestBed.inject(StoreMocks);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test API mock', () => {
    const apiService = StoreMocks.getApiService();
    expect(apiService).toBeTruthy();
  });

  it('should test Book Service mock', () => {
    const bookServiceMock = StoreMocks.getBookService();
    expect(bookServiceMock).toBeTruthy();
  });


  it('should test router service mock', () => {
    const routerServiceMock = StoreMocks.getMockRouterService();
    expect(routerServiceMock).toBeTruthy();
  });

  it('should test store service mock', () => {
    const storeServiceMock = StoreMocks.getMockStoreService();
      expect(storeServiceMock).toBeTruthy();
  });
});