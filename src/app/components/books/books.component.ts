import { Component, OnInit } from '@angular/core';
import { BookService } from '../../service/book-service/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  columns: any =
    [
      { key: 'HEADER_TEXT_1' },
      { key: 'HEADER_TEXT_2' },
      { key: 'HEADER_TEXT_3' },
      { key: 'HEADER_TEXT_4' },
      { key: 'HEADER_TEXT_5' }
    ];

  index = ['title', 'author', 'website', 'publisher'];
  editFormData: any;
  openFormModal: boolean = false;
  bookData: any;

  deleteForm: boolean = false;
  deleteId: string;
  userAccessToken: any;
  constructor(
    private bookService: BookService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getBookData();
  }

  getBookData(): void {
    this.bookService.getBook().subscribe((data) => {
      this.bookData = data;
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
    this.editFormData = [];
  }

  closeModal(): void {
    this.deleteForm = false;
    this.deleteId = '';
  }

  getData(): void {
    this.getBookData();
  }
}
