import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddEditBookComponent} from "../book/add-edit-book/add-edit-book.component";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {BookDto, CareerDto} from "../../model";
import {BookService} from "../book/service/book.service";
import {CareerService} from "./service/career.service";
import {AddEditCareerComponent} from "./add-edit-career/add-edit-career.component";

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule, AddEditBookComponent, ButtonModule, ConfirmDialogModule, SharedModule, TableModule, ToastModule, AddEditCareerComponent],
  providers:[MessageService,ConfirmationService],
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent {
  careers!:CareerDto[];
  selectEntity:any = false;
  displayAddEditModal:boolean = false;
  constructor(private careerService:CareerService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }
  ngOnInit():void{
    this.getEntityList();
  }
  getEntityList(){
    this.careerService.getCareer().subscribe(
      response =>{
        this.careers = response;
      },
      error => console.log(error.error)
    );
  }
  showEditModal(career:CareerDto){
    this.displayAddEditModal = true;
    this.selectEntity = career;
  }
  showAddModal (){
    this.displayAddEditModal = true;
    this.selectEntity = null;
  }
  hideAddModal(isClose:boolean){
    this.displayAddEditModal = !isClose;
  }
  saveUpdatePartoToList(event:any){
    if(this.selectEntity != null && this.selectEntity.id === event.id){
      const indexPart = this.careers.findIndex(dataSearch => dataSearch.id === event.id);
      this.careers[indexPart] = event;
    }else{
      this.careers.unshift(event);
    }
  }
}
