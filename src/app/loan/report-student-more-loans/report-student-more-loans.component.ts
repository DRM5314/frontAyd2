import {Component, inject, OnInit} from '@angular/core';
import {LoanService} from "../service/loan.service";
import {ActivatedRoute, Router} from "@angular/router";
import {reportStudentMoreLoans} from "../../../model";
import {CommonModule} from "@angular/common";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-report-student-more-loans',
  standalone: true,
  imports: [CommonModule, ConfirmDialogModule, SharedModule, TableModule, ToastModule],
  providers:[MessageService],
  templateUrl: './report-student-more-loans.component.html',
  styleUrls: ['./report-student-more-loans.component.css']
})
export class ReportStudentMoreLoansComponent  implements OnInit{
  private loanService = inject(LoanService);
  private router = inject(Router);
  moreStudentLoans!:reportStudentMoreLoans;
  private init!:string;
  private end!:string
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.init = params['init'];
      this.end = params['end'];
      this.loanService.getStudentMoreLoans({init:this.init,end:this.end}).subscribe(
        response => {
          this.moreStudentLoans = response;
          console.log(response);
        },
        error => {
          this.messageService.add({severity:'error',summary:'Error',detail: error.error})
        }
      )
    });
  }
}
