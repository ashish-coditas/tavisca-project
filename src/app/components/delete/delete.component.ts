import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import '../../elements/form-modal-button';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Output() deleteModal = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
