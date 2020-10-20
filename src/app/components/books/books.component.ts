import { Component, OnInit } from '@angular/core';
import { BookService } from '../../service/book-service/book.service';

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
  openFormModal = false;
  bookData: any = [];

  deleteForm: boolean = false;
  deleteId: any;
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.bookService.getBook().subscribe((data) => {
      this.bookData = data;
    });
  }

  onEdit(id) {
    this.bookService.getBookById(id).subscribe((data) => {
      this.editFormData = data;
      this.openFormModal = true;
    });
  }

  onDelete(id) {
    this.deleteForm = true;
    this.deleteId = id;
    // this.bookService.deleteBookById(id).subscribe((data) => {
    //   this.bookData = data;
    // });
  }

  deleteBook() {
    this.bookService.deleteBookById(this.deleteId).subscribe(() => {
      this.deleteForm = false;
      this.deleteId = '';
      this.getUsers();
    });
  }

  addBook() {
    this.openFormModal = true;
  }

  closeFormModal() {
    this.openFormModal = false;
    this.editFormData = [];
  }

  closeModal() {
    this.deleteForm = false;
    this.deleteId = '';
  }

  getData() {
    this.getUsers();
  }
}
