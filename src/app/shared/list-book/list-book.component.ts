
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { Book } from '../services/book'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  p: number = 1;
  Student: Book[];
  hideWhenNoStudent: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  
  constructor(
    public crudApi: CrudService,
    public toastr: ToastrService
    ){ }

  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetBookList(); 
    s.snapshotChanges().subscribe(data => {
      this.Student = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Student.push(a as Book);
      })
    })
  }
  dataState() {     
    this.crudApi.GetBookList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }
  deleteStudent(book) {
    if (window.confirm('Tem certeza que deseja deletar esse livro ?')) { 
      this.crudApi.DeleteBook(book.$key)
      this.toastr.success(book.name + ' deletado com sucesso!');
    }
  }
}