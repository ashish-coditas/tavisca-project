import { Component, OnInit} from '@angular/core';
import { BookService } from '../../service/book-service/book.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { ApiServiceService } from '../../service/api/api-service.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  columns: any =
    [
      { key: 'Title' , title:'Title'},
      { key: 'Author' , title:'Author'},
      { key: 'Website' , title:'Website'},
      { key: 'Publisher', title: 'Publisher' },
    ];

  editFormData: any = {};
  openFormModal: boolean = false;
  bookData: any;

  deleteForm: boolean = false;
  deleteId: string;
  constructor(
    private bookService: BookService,
    private toastrService: ToastrService,
    private apiService: ApiServiceService
  ) {
  }

  ngOnInit(): void {
    this.getBookData();
  }

  getBookData(): void {
    let responseData = [];
    const userToken = this.apiService.getToken();
    const emailId = userToken.email;
    this.bookService.getBook().subscribe((data) => {
      responseData = data;
      this.bookData = responseData.filter(obj => obj.createdBy === emailId);
    });
  }

  onEdit(id: string): void {
    this.bookService.getBookById(id).subscribe((data) => {
      this.editFormData = data;
      this.openFormModal = true;
    });
  }

  onDelete(id: string): void {
    this.deleteForm = true;
    this.deleteId = id;
  }

  deleteBook(): void {
    this.bookService.deleteBookById(this.deleteId).subscribe(() => {
      this.deleteForm = false;
      this.deleteId = '';
      this.toastrService.info('Deleted Successfully');
      this.getBookData();
    });
  }

  addBook(): void {
    this.openFormModal = true;
  }

  closeFormModal(): void {
    this.openFormModal = false;
    this.editFormData = {};
  }

  closeModal(): void {
    this.deleteForm = false;
    this.deleteId = '';
  }

  getData(): void {
    this.getBookData();
  }
}
