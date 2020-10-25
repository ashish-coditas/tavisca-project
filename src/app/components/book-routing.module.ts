import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: BooksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ReactiveFormsModule , FormsModule
  ],
  exports: [RouterModule]
})
export class BookRoutingModule { }
