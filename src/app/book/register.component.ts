import {Component, inject, Input} from '@angular/core';
import {BookService} from "./service/book.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {BookDto} from "../../model";
import {TableModule} from "primeng/table";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {AddEditBookComponent} from "./add-edit-book/add-edit-book.component";
import {JwtService} from "../auth/jwt.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone:true,
  imports: [TableModule, ConfirmDialogModule, ToastModule, DialogModule, AddEditBookComponent,CommonModule],
  providers:[MessageService,ConfirmationService]
})
export class RegisterComponent {
  isLoan = true;
  books!:BookDto[];
  selectBook:any = false;
  displayAddEditModal:boolean = false;
  jwtService: JwtService = inject(JwtService);
  rol = this.jwtService.getClaim("rol");
  constructor(private bookService:BookService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }
  ngOnInit():void{
    this.getBookList();
  }
  isAdmin(){
    if(this.rol=="ADMIN")return true;
    return false;
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
