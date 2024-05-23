import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {MessageService, SharedModule} from "primeng/api";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {BookCreateDto, EditorialDto} from "../../../model";
import {BookService} from "../service/book.service";
import {EditorialService} from "../../editorial/service/editorial.service";
import {ListboxModule} from "primeng/listbox";

@Component({
  selector: 'app-add-edit-book',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    SharedModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    NgIf,
    ListboxModule
  ],
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent {
  @Input() displayAddModal:boolean = true;
  @Input() selectBook:any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<BookCreateDto> = new EventEmitter<BookCreateDto>();

  date = new Date();
  year = this.date.getFullYear();
  month = String(this.date.getMonth() + 1). padStart(2, '0');
  day = String(this.date. getDate()). padStart(2, '0');
  dateParse = `${this.year}-${this.month}-${this.day}`

  modalType = "Agregar";
  editorials!:EditorialDto[];
  cantidad = 0;
  constructor(private formMap: FormBuilder, private bookService:BookService, private editorialService:EditorialService, private messageService:MessageService) {
    this.editorialService.getEditorials().subscribe(
      response =>{
        this.editorials = response;
      },
      error => {
        this.messageService.add({severity:'error',summary:'Error',detail: error.error});
      }
    )
  }
  bookForm = this.formMap.group(
    {
      code: ["",[Validators.required]],
      title: ["",[Validators.required]],
      auth: ["",[Validators.required]],
      quantity: [5,[Validators.required]],
      idEditorial:[1,[Validators.required]]
    }
  );
  closeModal(){
    this.bookForm.reset();
    this.clickClose.emit(true);
  }

  addEditBook(){
    var bookCreate = new BookCreateDto();
    bookCreate.code = this.bookForm.get('code')?.value;
    bookCreate.title = this.bookForm.get('title')?.value;
    bookCreate.auth = this.bookForm.get('auth')?.value;
    bookCreate.quantity = this.bookForm.get('quantity')?.value;
    bookCreate.datePublication = this.dateParse;
    // @ts-ignore
    bookCreate.idEditorial = this.bookForm.get('idEditorial')?.value.id;
    console.log(bookCreate);
    this.bookService.addEditBook(bookCreate,this.modalType).subscribe(
      response=>{
        this.clickAddEdit.emit(response);
        this.closeModal();
        const msg = this.modalType === "Agregar" ? "Book agregada!" : "Book editada!";
        this.messageService.add({severity:'success',summary:'success',detail:msg});
      },
      error => {
        this.messageService.add({severity:'error',summary:'Error',detail: error.error})
      }
    );
  }

  ngOnChanges() {
    if(this.selectBook){
      this.bookForm.patchValue(this.selectBook);
      this.modalType = "Editar";
    }else{
      this.bookForm.reset();
      this.modalType =  "Agregar";
    }
  }
}
