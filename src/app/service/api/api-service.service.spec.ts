import { TestBed, inject } from '@angular/core/testing';

import { ApiServiceService } from './api-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiServiceService', () => {
  let service: ApiServiceService;
  let httpMock: HttpTestingController;

  const dummyToken = {
    token: '324234234324',
    email: 'abc@gmail.com',
  }

  const dummyUser = {
    email: 'abc@gmail.com',
    password: '123456',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiServiceService
      ],
      imports: [HttpClientTestingModule]

    });
    service = TestBed.inject(ApiServiceService);

    let store = {};
    const mockSessionStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(sessionStorage, 'getItem')
      .and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem')
      .and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'clear')
      .and.callFake(mockSessionStorage.clear);
  });

  beforeEach(inject([ApiServiceService, HttpTestingController], (service$, httpMock$) => {
    service = service$;
    httpMock = httpMock$;
  }));


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('it should create login user', () => {
    service.login(dummyUser).subscribe(data => {
      expect(data).toEqual('access_token');
    });
    const req = httpMock.expectOne('http://localhost:8080/login/');
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
    httpMock.verify();
  });

  it('it should  create register user', () => {
    service.register({ email: 'abc@123', password: '123456', firstName: 'abc', lastName: 'xyz' }).subscribe(data => {
      expect(data).toEqual('access_token');
    });
    const req = httpMock.expectOne('http://localhost:8080/users/');
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
    httpMock.verify();
  });


  it('it should store token in sessionStorage', () => {
    service.setToken(dummyToken.token, dummyToken.email);
  });


  it('should return token from sessionStorage', () => {
    service.getToken();
    expect(sessionStorage.getItem);
  });

  it('should clear storage', function () {
    service.removeToken();
    expect(sessionStorage.length).toBe(0);
  });
});
