import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-book-student',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class EditBookComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    private crudApi: CrudService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.updateBookData();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.crudApi
      .GetBook(id)
      .valueChanges()
      .subscribe((data) => {
        this.editForm.setValue(data);
      });
  }
  get BookId() {
    return this.editForm.get('id');
  }
  get BookName() {
    return this.editForm.get('name');
  }
  get Bookdescription() {
    return this.editForm.get('description');
  }
  get Bookvalue() {
    return this.editForm.get('value');
  }
  updateBookData() {
    this.editForm = this.fb.group({
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
  goBack() {
    this.location.back();
  }
  updateForm() {
    this.crudApi.UpdateBook(this.editForm.value);
    this.toastr.success(
      this.editForm.controls['name'].value + ' atualizado com sucesso!!'
    );
    this.router.navigate(['view-books']);
  }
}
