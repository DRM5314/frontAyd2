import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import {MessageService, SharedModule} from "primeng/api";
import {BookCreateDto, EditorialCreateDto, EditorialUpdateDto} from "../../../model";
import {BookService} from "../../book/service/book.service";
import {EditorialService} from "../service/editorial.service";

@Component({
  selector: 'app-add-edit-editorial',
  standalone: true,
    imports: [CommonModule, ButtonModule, DialogModule, FormsModule, InputNumberModule, InputTextModule, ListboxModule, ReactiveFormsModule, SharedModule],
  templateUrl: './add-edit-editorial.component.html',
  styleUrls: ['./add-edit-editorial.component.css']
})
export class AddEditEditorialComponent {
  @Input() displayAddModal:boolean = true;
  @Input() selectEditorial:any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<EditorialCreateDto> = new EventEmitter<EditorialCreateDto>();
  modalType = "Agregar";
  constructor(private formMap: FormBuilder, private editorialService:EditorialService, private messageService:MessageService) {}

  editorialForm = this.formMap.group(
    {
      name: ["",[Validators.required]],
      id: [null]
    }
  );
  closeModal(){
    this.editorialForm.reset();
    this.clickClose.emit(true);
  }

  addEditEditorial(){
    var editorialCreate = new EditorialUpdateDto();
    editorialCreate.name = this.editorialForm.get('name')?.value;
    editorialCreate.id = this.editorialForm.get('id')?.value;
    // @ts-ignore
    console.log(editorialCreate);
    this.editorialService.addEditEditorial(editorialCreate,this.modalType).subscribe(
      response=>{
        this.clickAddEdit.emit(response);
        this.closeModal();
        const msg = this.modalType === "Agregar" ? "Editorial agregada!" : "Editoral editada!";
        this.messageService.add({severity:'success',summary:'success',detail:msg});
      },
      error => {
        this.messageService.add({severity:'error',summary:'Error',detail: error.error})
      }
    );
  }
  ngOnChanges() {
    if(this.selectEditorial){
      this.editorialForm.patchValue(this.selectEditorial);
      this.modalType = "Editar";
    }else{
      this.editorialForm.reset();
      this.modalType =  "Agregar";
    }
  }
}
