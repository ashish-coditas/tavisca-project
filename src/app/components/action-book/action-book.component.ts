import { Component, OnInit, EventEmitter, Output ,Input, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  @ViewChild("myinput") myInputField: ElementRef;
  @Output() closeModal = new EventEmitter();
  @Output() getData = new EventEmitter();
  @Input() editData: any = {};
  bookForm: FormGroup;
  userEmailId: string;
  editNew: string;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private toastrService: ToastrService,
    private apiService: ApiServiceService,
  ) { 

  }

  ngOnInit(): void {

    this.bookForm = this.formBuilder.group({
      id: null,
      title:  ['', Validators.required],
      subtitle: '',
      author:  ['', Validators.required],
      published:  ['', Validators.required],
      publisher:  ['', Validators.required],
      pages: ['', Validators.pattern("^[0-9]*$")],
      description: '',
      website: '',
      createdBy: '',
    });
    this.editFormData();
    const user = this.apiService.getToken();
    this.userEmailId = user.email;
    
  }

  get bookFormData() {
    return this.bookForm.controls;
  }

  editFormData(): void {
    if (!_.isEmpty(this.editData)) {
      this.bookForm.patchValue(this.editData);
      this.editNew = 'Edit';
    } else {
      this.editNew = 'New';
    }
  }

  onSubmit(form: FormGroup): void {
    var number = Math.floor(Math.random() * 9000000000) + 1000000000;
    this.bookForm.value.createdBy = this.userEmailId;
    this.submitted = true;
    if (this.bookForm.invalid) {
      return;
    }

    if (form.value.id === null) {
      form.value.id = number;
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

  ngAfterViewInit() {
    this.myInputField.nativeElement.shadowRoot;
  }

  onISBNInput(text) {
    this.bookForm.controls['id'].setValue(text);
  }

  onTitleInput(text) {
    this.bookForm.controls['title'].setValue(text);
  }

  onSubtitleInput(text) {
    this.bookForm.controls['subtitle'].setValue(text);
  }

  onAuthorInput(text) {
    this.bookForm.controls['author'].setValue(text);
  }

  onPublishedInput(text) {
    this.bookForm.controls['published'].setValue(text);
  }

  onPublisherInput(text) {
    this.bookForm.controls['publisher'].setValue(text);
  }

  onPageInput(text) {
    this.bookForm.controls['pages'].setValue(text);
  }

  onDescriptionInput(text) {
    this.bookForm.controls['description'].setValue(text);
  }

  onWebsiteInput(text) {
    this.bookForm.controls['website'].setValue(text);
  }
}
