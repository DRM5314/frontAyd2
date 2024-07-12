import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoanService} from "../service/loan.service";
import {ActivatedRoute, Router} from "@angular/router";
import {reportMoreLoansCareer, reportStudentPaymentSanction} from "../../../model";
import {PaymentService} from "../../payment/service/payment.service";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-report-student-payment-sanction',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, ToastModule],
  providers:[MessageService],
  templateUrl: './report-student-payment-sanction.component.html',
  styleUrls: ['./report-student-payment-sanction.component.css']
})
export class ReportStudentPaymentSanctionComponent  implements OnInit{
  private loanService = inject(PaymentService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  studentPaymentsSanction!:reportStudentPaymentSanction;
  private carnet!:string;
  private init!:string;
  private end!:string
  private route = inject(ActivatedRoute);
  isReport!:boolean;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.carnet = params['carnet'];
      this.init = params['init'];
      this.end = params['end'];
      this.isReport = (params['type']==='report');
      this.getPayment()
    });
  }
  getPayment(){
    if (this.isReport){
      this.loanService.getReport({carnet:this.carnet,init: this.init, end: this.end}).subscribe(
        response => {
          this.studentPaymentsSanction = response;
        },
        error => {
          this.messageService.add({severity:'error',summary:'Error',detail: error.error})
        }
      );
    }else{
      this.loanService.getMyPayments().subscribe(
        response => {
          console.log(response);
          this.studentPaymentsSanction = response;
        },
        error => {
          this.messageService.add({severity:'error',summary:'Error',detail: error.error})
        }
      );
    }
  }
}
