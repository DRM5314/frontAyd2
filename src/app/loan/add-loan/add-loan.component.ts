import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddEditBookComponent} from "../../book/add-edit-book/add-edit-book.component";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {BookCreateDto, EditorialDto, LoanCreateDto, LoanDto} from "../../../model";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {BookService} from "../../book/service/book.service";
import {EditorialService} from "../../editorial/service/editorial.service";
import {DialogModule} from "primeng/dialog";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import {PaginatorModule} from "primeng/paginator";
import {LoanService} from "../service/loan.service";
import {ViewLoanComponent} from "../view-loan/view-loan.component";

@Component({
  selector: 'app-add-loan',
  standalone: true,
  imports: [CommonModule, AddEditBookComponent, ButtonModule, ConfirmDialogModule, SharedModule, TableModule, ToastModule, DialogModule, InputNumberModule, InputTextModule, ListboxModule, PaginatorModule, ReactiveFormsModule, ViewLoanComponent],
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.css']
})
export class AddLoanComponent {
  @Input() displayAddModal:boolean = true;
  @Input() selectBook:any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() loan!:LoanDto;
  showInvoice = false;
  date = new Date();
  year = this.date.getFullYear();
  month = String(this.date.getMonth() + 1). padStart(2, '0');
  day = String(this.date. getDate()). padStart(2, '0');
  dateParse = `${this.year}-${this.month}-${this.day}`

  modalType = "Agregar";
  editorials!:EditorialDto[];
  cantidad = 0;
  constructor(private formMap: FormBuilder, private loanService:LoanService, private messageService:MessageService) {
  }
  loanForm = this.formMap.group(
    {
      carnet: ["",[Validators.required]]
    }
  );
  closeModal(){
    this.loanForm.reset();
    this.clickClose.emit(true);
  }

  addLoan(){
    var dateReturn = `${this.year}-${this.month}-${(this.day)}`
    var loan = new LoanCreateDto();
    loan.bookCode = this.selectBook.code;
    loan.carnet = this.loanForm.get('carnet')?.value;
    loan.laonDate = this.dateParse;
    loan.status = "borrowed";
    console.log(dateReturn)
    this.loanService.addLoan(loan,this.modalType).subscribe(
      response=>{
        this.closeModal();
        const msg = "Prestamo realizado!"
        this.messageService.add({severity:'success',summary:'success',detail:msg});
        this.loan = response;
        this.showInvoice = true;
      },
      error => {
        this.messageService.add({severity:'error',summary:'Error',detail: error.error})
      }
    );
  }

  ngOnChanges() {
    if(this.selectBook){
      this.loanForm.patchValue(this.selectBook);
      this.modalType = "Agregar";
    }else{
      this.loanForm.reset();
      this.modalType =  "Agregar";
    }
  }
}
