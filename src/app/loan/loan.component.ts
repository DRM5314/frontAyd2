import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {AddEditBookComponent} from "../book/add-edit-book/add-edit-book.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {BookDto, LoanDto} from "../../model";
import {BookService} from "../book/service/book.service";
import {AddLoanComponent} from "./add-loan/add-loan.component";

@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule, FormsModule, InputNumberModule, InputTextModule, ListboxModule, ReactiveFormsModule, SharedModule, AddEditBookComponent, ConfirmDialogModule, TableModule, ToastModule, AddLoanComponent],
  providers:[MessageService,ConfirmationService],
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent {
  books!:BookDto[];
  selectBook:any = false;
  displayAddEditModal:boolean = false;
  constructor(private bookService:BookService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }
  ngOnInit():void{
    this.getBookList();
  }
  getBookList(){
    this.bookService.getBooks().subscribe(
      response =>{
        this.books = response;
      },
      error => console.log(error.error)
    );
  }
  showEditModal(book:BookDto){
    this.displayAddEditModal = true;
    this.selectBook = book;
  }
  showAddModal (){
    this.displayAddEditModal = true;
    this.selectBook = null;
  }
  hideAddModal(isClose:boolean){
    this.displayAddEditModal = !isClose;
    this.getBookList();
  }
  saveUpdatePartoToList(event:any){
    if(this.selectBook != null && this.selectBook.code === event.code){
      const indexPart = this.books.findIndex(dataSearch => dataSearch.code === event.code);
      this.books[indexPart] = event;
    }else{
      this.books.unshift(event);
    }
  }
}
