import { Component, OnInit, EventEmitter, Output ,Input} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BookService } from '../../service/book-service/book.service';

@Component({
  selector: 'app-action-book',
  templateUrl: './action-book.component.html',
  styleUrls: ['./action-book.component.css']
})
export class ActionBookComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Output() getData = new EventEmitter();
  @Input() editData: any;
  bookForm: FormGroup;
  editNew = '';
  constructor(
    private fb: FormBuilder,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      id: null,
      title: '',
      subtitle: '',
      author: '',
      published: '',
      publisher: '',
      pages: '',
      description: '',
      website: '',
    });
    this.editFormData();
  }


  editFormData() {
    if (this.editData !== undefined) {
      this.bookForm.patchValue(this.editData);
      this.editNew = 'Edit';
    } else {
      this.editNew = 'New';
    }
  }

  onSubmit(form: FormGroup) {
    if (form.value.id === null) {
      this.bookService.addBookData(form.value).subscribe(data => {
        this.getData.emit();
        this.closeModal.emit();
      });
    } else {
      this.bookService.updateBookData(form.value).subscribe(data => {
        this.getData.emit();
        this.closeModal.emit();
      });
    }
  }
}
