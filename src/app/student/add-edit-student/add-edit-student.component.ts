import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import { MessageService, SharedModule} from "primeng/api";
import {CareerDto, StudentCreateDto, StudentDto} from "../../../model";
import {StudentService} from "../service/student.service";
import {CareerService} from "../../career/service/career.service";
import {InputMaskModule} from "primeng/inputmask";

@Component({
  selector: 'app-add-edit-student',
  standalone: true,
    imports: [CommonModule, ButtonModule, DialogModule, FormsModule, InputNumberModule, InputTextModule, ListboxModule, ReactiveFormsModule, SharedModule, InputMaskModule],
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.css']
})
export class AddEditStudentComponent {
  @Input() displayAddModal:boolean = true;
  @Input() selectStudent:any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<StudentDto> = new EventEmitter<StudentDto>();

  modalType = "Agregar";
  careers!:CareerDto[];
  constructor(private formMap: FormBuilder, private studentService:StudentService, private careerService:CareerService, private messageService:MessageService) {
    this.careerService.getCareer().subscribe(
      response =>{
        this.careers = response;
      },
      error => {
        this.messageService.add({severity:'error',summary:'Error',detail: error.error});
      }
    )
  }
  studentForm = this.formMap.group(
    {
      name: ["",[Validators.required]],
      idCareer: ["",[Validators.required]],
      dteBirth: ["",[Validators.required]],
      carnet: ["201632145",[Validators.required]]
    }
  );
  closeModal(){
    this.studentForm.reset();
    this.clickClose.emit(true);
  }

  addEditBook(){
    var studentCreate = new StudentCreateDto();
    studentCreate.name = this.studentForm.get('name')?.value;
    // @ts-ignore
    studentCreate.idCareer = this.studentForm.get('idCareer')?.value.id;
    studentCreate.dteBirth = this.studentForm.get('dteBirth')?.value;
    studentCreate.carnet = this.studentForm.get('carnet')?.value;
    // @ts-ignore
    console.log(studentCreate);
    this.studentService.addEditStudent(studentCreate,this.modalType).subscribe(
      response=>{
        this.clickAddEdit.emit(response);
        this.closeModal();
        const msg = this.modalType === "Agregar" ? "Student agregada!" : "Student editada!";
        this.messageService.add({severity:'success',summary:'success',detail:msg});
      },
      error => {
        this.messageService.add({severity:'error',summary:'Error',detail: error.error})
      }
    );
  }

  ngOnChanges() {
    if(this.selectStudent){
      this.studentForm.patchValue(this.selectStudent);
      this.modalType = "Editar";
    }else{
      this.studentForm.reset();
      this.modalType =  "Agregar";
    }
  }

}
