import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoanService} from "../service/loan.service";
import {ActivatedRoute, Router} from "@angular/router";
import {reportMoreLoansCareer} from "../../../model";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-career-more-loans',
  standalone: true,
  imports: [CommonModule, ConfirmDialogModule, SharedModule, TableModule, ToastModule],
  providers:[MessageService],
  templateUrl: './career-more-loans.component.html',
  styleUrls: ['./career-more-loans.component.css']
})
export class CareerMoreLoansComponent implements OnInit{
  private loanService = inject(LoanService);
  private router = inject(Router);
  moreCareerLoans!:reportMoreLoansCareer;
  private init!:string;
  private end!:string
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.init = params['init'];
      this.end = params['end'];
      this.loanService.getMoreCareerLoans({init:this.init,end:this.end}).subscribe(
        response => {
          this.moreCareerLoans = response;
        },
        error => {
          console.log(error);
        }
      )
    });
  }
}
