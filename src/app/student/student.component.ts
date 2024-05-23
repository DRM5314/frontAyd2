import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddEditBookComponent} from "../book/add-edit-book/add-edit-book.component";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {BookDto, StudentDto} from "../../model";
import {BookService} from "../book/service/book.service";
import {StudentService} from "./service/student.service";
import {AddEditStudentComponent} from "./add-edit-student/add-edit-student.component";

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, AddEditBookComponent, ButtonModule, ConfirmDialogModule, SharedModule, TableModule, ToastModule, AddEditStudentComponent],
  providers:[MessageService,ConfirmationService],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  students!:StudentDto[];
  selectStudent:any = false;
  displayAddEditModal:boolean = false;
  constructor(private studentService:StudentService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnInit():void{
    this.getStudentList();
  }
  getStudentList(){
    this.studentService.getStudents().subscribe(
      response =>{
        this.students = response;
      },
      error => console.log(error.error)
    );
  }
  showEditModal(book:BookDto){
    this.displayAddEditModal = true;
    this.selectStudent = book;
  }
  showAddModal (){
    this.displayAddEditModal = true;
    this.selectStudent = null;
  }
  hideAddModal(isClose:boolean){
    this.displayAddEditModal = !isClose;
  }
  saveUpdatePartoToList(event:any){
    if(this.selectStudent != null && this.selectStudent.carnet === event.carnet){
      const indexPart = this.students.findIndex(dataSearch => dataSearch.carnet === event.carnet);
      this.students[indexPart] = event;
    }else{
      this.students.unshift(event);
    }
  }

}
