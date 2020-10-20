import { Component, OnInit } from '@angular/core';
import { BookService } from '../../service/book-service/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  columns = ['Title', 'Author', 'Website', 'Description', 'Actions'];
  index = ['title', 'author', 'website', 'description'];
  editFormData: any;
  openFormModal = false;
 bookData: any = [];
  constructor(
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.bookService.getBook().subscribe(data => {
      this.bookData = data;
    });
  }

  onEdit(id) {
    this.bookService.getBookById(id).subscribe(data => {
      this.editFormData = data;
      this.openFormModal = true;
    });
  }

  onDelete(id) {
    this.bookService.deleteBookById(id).subscribe(data => {
      this.bookData = data;
    });
  }

  addBook() {
    this.openFormModal = true;
  }

  closeFormModal() {
    this.openFormModal = false;
    this.editFormData = [];
  }

  getData() {
    this.getUsers();
  }
}
