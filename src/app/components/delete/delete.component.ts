import { Component, OnInit, EventEmitter, Output } from '@angular/core';

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


  onClose() {
    this.closeModal.emit();
  }

  onDelete() {
    this.deleteModal.emit();
  }
}
