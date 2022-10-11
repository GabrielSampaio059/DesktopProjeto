import { Injectable } from '@angular/core';
import { Book } from './book';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  BooksRef: AngularFireList<any>;
  BookRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}
  // Create Student
  AddBook(Book: Book) {
    this.BooksRef.push({
      id:Book.id,
      name:Book.name,
      value:Book.value,
      description:Book.description,
    });
  }
  // Fetch Single Student Object
  GetBook(id: string) {
    this.BookRef = this.db.object('Book-list/' + id);
    return this.BookRef;
  }
  // Fetch Students List
  GetBookList() {
    this.BooksRef = this.db.list('Books-list');
    return this.BooksRef;
  }
  // Update Student Object
  UpdateBook(Book: Book) {
    this.BookRef.update({
      
        id:Book.id,
        name:Book.name,
        value:Book.value,
        description:Book.description,
    });
  }
  // Delete Student Object
  DeleteBook(id: string) {
    this.BookRef = this.db.object('book-list/' + id);
    this.BookRef.remove();
  }
}