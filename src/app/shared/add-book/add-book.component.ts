import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  public BookForm: FormGroup;
  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) {}
  ngOnInit() {
    this.crudApi.GetBookList();
    this.BooksForm();
  }
  BooksForm() {
    this.BookForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      id: ['',[Validators.required, Validators.pattern('^[0-9]+$')]],
      description: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+$'),
        ],
      ],
      value: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  get BookId() {
    return this.BookForm.get('id');
  }
  get BookName() {
    return this.BookForm.get('name');
  }
  get Bookdescription() {
    return this.BookForm.get('description');
  }
  get Bookvalue() {
    return this.BookForm.get('value');
  }
  ResetForm() {
    this.BookForm.reset();
  }
  submitBookData() {
    this.crudApi.AddBook(this.BookForm.value);
    this.toastr.success(
      this.BookForm.controls['name'].value + ' Adicionado com sucesso!'
    );
    this.ResetForm();
  }
}
