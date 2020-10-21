import { Component, OnInit, EventEmitter, Output ,Input} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BookService } from '../../service/book-service/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-action-book',
  templateUrl: './action-book.component.html',
  styleUrls: ['./action-book.component.css']
})
export class ActionBookComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Output() getData = new EventEmitter();
  @Input() editData: any;
  @Input() bookForm: FormGroup;
  editNew: string;
  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private toastrService: ToastrService
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


  editFormData(): void {
    this.editNew = '';
    if (this.editData.length !== 0) {
      this.bookForm.patchValue(this.editData);
      this.editNew = 'Edit';
    } else {
      this.editNew = 'New';
    }
  }

  onSubmit(form: FormGroup): void {
    if (form.value.id === null) {
      this.bookService.addBookData(form.value).subscribe(data => {
        this.getData.emit();
        this.closeModal.emit();
        this.toastrService.success('Saved Successfully');
      },
        error => {
          console.log('error', error);
        }
      );
    } else {
      this.bookService.updateBookData(form.value).subscribe(data => {
        this.getData.emit();
        this.closeModal.emit();
        this.toastrService.success('Updated Successfully');
      },
      error => {
        console.log('error', error);
      }
      );
    }
  }
}
