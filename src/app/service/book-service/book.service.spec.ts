import { TestBed, inject } from '@angular/core/testing';

import { BookService } from './book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';



describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;
  const dummyBook =  [{
    id: '9781593275846',
    title: 'Eloquent JavaScript, Second Edition',
    subtitle: 'A Modern Introduction to Programming',
    author: 'Marijn',
    published: '2014-12-14',
    publisher: 'No Starch Press',
    pages: 472,
    description: 'JavaScript',
  website: 'http://eloquentjavascript.net/'
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    providers: [
      BookService
    ]
    });

    service = TestBed.inject(BookService);
  });

  beforeEach(
    inject([BookService, HttpTestingController], (service$, httpMock$) => {
      service = service$;
      httpMock = httpMock$;
    }));

  it('it should return books data', () => {
    service.getBook().subscribe(data => {
        expect(data).toEqual(dummyBook);
      });
    const req = httpMock.expectOne('http://localhost:3000/Books');
    req.flush(dummyBook);
    httpMock.verify();
  });

  it('it should return books by id', () => {
    service.getBookById(0).subscribe(data => {
      expect(data[0].id).toEqual('9781593275846');
      expect(data[0].title).toEqual('Eloquent JavaScript, Second Edition');
      expect(data[0].subtitle).toEqual('A Modern Introduction to Programming');
      expect(data[0].author).toEqual('Marijn');
      expect(data[0].published).toEqual('2014-12-14');
      expect(data[0].publisher).toEqual('No Starch Press');
      expect(data[0].pages).toEqual(472);
      expect(data[0].description).toEqual('JavaScript');
      expect(data[0].website).toEqual('http://eloquentjavascript.net/');
      });
    const req = httpMock.expectOne('http://localhost:3000/Books/0');
    req.flush(dummyBook);
    httpMock.verify();
  });

  it('it should save books data', () => {
    service.addBookData({id : '9781593275846'}).subscribe(data => {
        expect(data[0].author).toEqual('Marijn');
      });
    const req = httpMock.expectOne('http://localhost:3000/Books', dummyBook[0].author);
    expect(req.request.method).toBe('POST');
    req.flush(dummyBook);
    httpMock.verify();
  });

  it('it should delete books data', () => {
    service.deleteBookById(0).subscribe(data => {
        expect(data).toEqual('');
      });
    const req = httpMock.expectOne('http://localhost:3000/Books/0');
    req.flush(dummyBook);
    httpMock.verify();
  });
});
