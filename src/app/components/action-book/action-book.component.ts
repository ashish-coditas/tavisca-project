import { Component, OnInit, EventEmitter, Output ,Input} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BookService } from '../../service/book-service/book.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { ApiServiceService } from '../../service/api/api-service.service';

@Component({
  selector: 'app-action-book',
  templateUrl: './action-book.component.html',
  styleUrls: ['./action-book.component.css']
})
export class ActionBookComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Output() getData = new EventEmitter();
  @Input() editData: any = {};
  bookForm: FormGroup;
  userEmailId: string;
  editNew: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private toastrService: ToastrService,
    private apiService: ApiServiceService,
  ) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      id: null,
      title: '',
      subtitle: '',
      author: '',
      published: '',
      publisher: '',
      pages: '',
      description: '',
      website: '',
      createdBy: '',
    });
    this.editFormData();
    const user = this.apiService.getToken();
    this.userEmailId = user.email;
  }


  editFormData(): void {
    this.editNew = '';
    if (!_.isEmpty(this.editData)) {
      this.bookForm.patchValue(this.editData);
      this.editNew = 'Edit';
    } else {
      this.editNew = 'New';
    }
  }

  onSubmit(form: FormGroup): void {
      this.bookForm.value.createdBy = this.userEmailId;
      if (form.value.id === null) {
        this.bookService.addBookData(form.value).subscribe(data => {
          this.getData.emit();
          this.closeModal.emit();
          this.toastrService.success('Saved Successfully');
        });
      } else {
        this.bookService.updateBookData(form.value).subscribe(data => {
          this.getData.emit();
          this.closeModal.emit(); 
          this.toastrService.success('Updated Successfully');
        });
      }
  }
  
  onClose(){
    this.closeModal.emit();
  }
}
