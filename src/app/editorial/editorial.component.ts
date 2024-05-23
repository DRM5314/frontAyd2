import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddEditBookComponent} from "../book/add-edit-book/add-edit-book.component";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {BookDto, EditorialDto} from "../../model";
import {BookService} from "../book/service/book.service";
import {EditorialService} from "./service/editorial.service";
import {AddEditEditorialComponent} from "./add-edit-editorial/add-edit-editorial.component";

@Component({
  selector: 'app-editorial',
  standalone: true,
  imports: [CommonModule, AddEditBookComponent, ButtonModule, ConfirmDialogModule, SharedModule, TableModule, ToastModule, AddEditEditorialComponent],
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css'],
  providers:[MessageService,ConfirmationService]
})
export class EditorialComponent {
  editorials!:EditorialDto[];
  selectEditorial:any = false;
  displayAddEditModal:boolean = false;
  constructor(private editorialService:EditorialService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnInit():void{
    this.getEditorialList();
  }
  getEditorialList(){
    this.editorialService.getEditorials().subscribe(
      response =>{
        this.editorials = response;
      },
      error => console.log(error.error)
    );
  }
  showEditModal(editorial:EditorialDto){
    this.displayAddEditModal = true;
    this.selectEditorial = editorial;
  }
  showAddModal (){
    this.displayAddEditModal = true;
    this.selectEditorial = null;
  }
  hideAddModal(isClose:boolean){
    this.displayAddEditModal = !isClose;
  }
  saveUpdatePartoToList(event:any){
    if(this.selectEditorial != null && this.selectEditorial.id === event.id){
      const indexPart = this.editorials.findIndex(dataSearch => dataSearch.id === event.id);
      this.editorials[indexPart] = event;
    }else{
      this.editorials.unshift(event);
    }
  }

}
