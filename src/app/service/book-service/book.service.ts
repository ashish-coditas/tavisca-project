import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private httpCLient: HttpClient
  ) { }

  getBook() {
    return this.httpCLient.get(environment.hostURL);
  }

  getBookById(id) {
    return this.httpCLient.get(environment.hostURL + '/' + id);
  }

  deleteBookById(id) {
    return this.httpCLient.delete(environment.hostURL + '/' + id);
  }

  addBookData(data) {
    return this.httpCLient.post(environment.hostURL , data);
  }

  updateBookData(data) {
    return this.httpCLient.put(environment.hostURL + '/' + data.id , data);
  }

}
