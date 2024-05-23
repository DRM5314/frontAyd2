import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {CareerDto, CareerRequestDto, CareerUpdateRequestDto, EditorialDto} from "../../../model";
import {CareerService} from "../service/career.service";

@Component({
  selector: 'app-add-edit-career',
  standalone: true,
    imports: [CommonModule, ButtonModule, DialogModule, InputNumberModule, InputTextModule, ListboxModule, PaginatorModule, ReactiveFormsModule, SharedModule],
  templateUrl: './add-edit-career.component.html',
  styleUrls: ['./add-edit-career.component.css']
})
export class AddEditCareerComponent {
  @Input() displayAddModal:boolean = true;
  @Input() selectEntity:any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<CareerDto> = new EventEmitter<CareerDto>();


  modalType = "Agregar";
  careers!:EditorialDto[];
  cantidad = 0;
  constructor(private formMap: FormBuilder, private careerService:CareerService, private messageService:MessageService) {
  }
  formGroupEntry = this.formMap.group(
    {
      id: [1],
      name: ["",[Validators.required]]
    }
  );
  closeModal(){
    this.formGroupEntry.reset();
    this.clickClose.emit(true);
  }

  addEditEntity(){
    var createDto = new CareerUpdateRequestDto();
    createDto.id = this.formGroupEntry.get('id')?.value;
    createDto.name = this.formGroupEntry.get('name')?.value;
    console.log(createDto);
    this.careerService.addEdit(createDto,this.modalType).subscribe(
      response=>{
        this.clickAddEdit.emit(response);
        this.closeModal();
        const msg = this.modalType === "Agregar" ? "Career agregada!" : "Career editada!";
        this.messageService.add({severity:'success',summary:'success',detail:msg});
      },
      error => {
        this.messageService.add({severity:'error',summary:'Error',detail: error.error})
      }
    );
  }

  ngOnChanges() {
    if(this.selectEntity){
      this.formGroupEntry.patchValue(this.selectEntity);
      this.modalType = "Editar";
    }else{
      this.formGroupEntry.reset();
      this.modalType =  "Agregar";
    }
  }

}
