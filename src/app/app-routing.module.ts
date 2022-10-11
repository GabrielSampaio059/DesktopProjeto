import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './shared/add-book/add-book.component';
import { BookListComponent } from './shared/list-book/list-book.component';
import { EditBookComponent } from './shared/update-book/update-book.component';
const routes: Routes = [
  { path: '', redirectTo: '/register-book', pathMatch: 'full' },
  { path: 'register-book', component: AddBookComponent },
  { path: 'view-books', component: BookListComponent },
  { path: 'edit-book/:id', component: EditBookComponent }
];
@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }