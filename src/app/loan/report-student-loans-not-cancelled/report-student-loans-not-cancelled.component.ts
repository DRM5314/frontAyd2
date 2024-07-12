import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoanService} from "../service/loan.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoanDto, reportStudentLoansNotCancelled, reportStudentMoreLoans} from "../../../model";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {PaymentService} from "../../payment/service/payment.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@Component({
  selector: 'app-report-student-loans-not-cancelled',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, ToastModule, ButtonModule, ConfirmDialogModule],
  providers:[MessageService,ConfirmationService],
  templateUrl: './report-student-loans-not-cancelled.component.html',
  styleUrls: ['./report-student-loans-not-cancelled.component.css']
})
export class ReportStudentLoansNotCancelledComponent implements OnInit{
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private paymentService = inject(PaymentService);
  private loanService = inject(LoanService);
  studentLoans!:reportStudentLoansNotCancelled;
  private carnet!:string;
  devolutions!:boolean;
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.carnet = params['code'];
      this.devolutions = (params['devolutions'] === 'true');
      this.obtenerPrestamos();
    });
  }
  obtenerPrestamos(){
    if (this.carnet !== "null"){
      this.loanService.getStudentLoansNotCancelled(this.carnet).subscribe(
        response => {
          this.studentLoans = response;
        },
        error => {
          this.messageService.add({severity:'error',summary:'Error',detail: error.error})
        }
      );
    }else{
      this.loanService.getNotCancelledByMe().subscribe(
        response => {
          this.studentLoans = response;
        },
        error => {
          this.messageService.add({severity:'error',summary:'Error',detail: error.error})
        }
      );
    }
  }
  regresar(loan:LoanDto):void {
    this.confirmationService.confirm({
      message:`Confirmar devolucion de prestamo: ${loan.bookCode.title} codigo: ${loan.bookCode.code}`,
      icon: 'pi pi-exclamation-triangle',
      accept: ()=>{
        this.paymentService.postPayment({loan:loan.id,type:'normal'}).subscribe(response=>{
            this.obtenerPrestamos();
          this.messageService.add({severity:'success',summary:'success',detail:"Devolucion registrada!"});
          },
          error => this.messageService.add({severity:'error', summary: 'Error', detail: error.error})
        );
      }
    });
  }
  isDevolution(){
    return this.devolutions;
  }
}

