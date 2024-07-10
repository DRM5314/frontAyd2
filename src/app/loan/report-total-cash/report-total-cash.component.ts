import {Component, inject, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoanService} from "../service/loan.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoanDto, reportTotalCashDto} from "../../../model";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-report-total-cash',
  standalone: true,
  imports: [CommonModule, ConfirmDialogModule, SharedModule, TableModule, ToastModule],
  providers:[ConfirmationService,MessageService],
  templateUrl: './report-total-cash.component.html',
  styleUrls: ['./report-total-cash.component.css']
})
export class ReportTotalCashComponent implements OnInit{
  private loanService = inject(LoanService);
  private router = inject(Router);
  totalCashDto!:reportTotalCashDto;
  private init!:string;
  private end!:string
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.init = params['init'];
      this.end = params['end'];
      this.loanService.getTotalCash({init:this.init,end:this.end}).subscribe(
        response => {
          this.totalCashDto = response;
        },
        error => {
          console.log(error);
        }
      )
    });
  }
}
