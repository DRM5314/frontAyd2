import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddLoanComponent} from "../add-loan/add-loan.component";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {LoanService} from "../service/loan.service";
import {Router} from "@angular/router";
import {LoanDto} from "../../../model";

@Component({
  selector: 'app-returns-now',
  standalone: true,
    imports: [CommonModule, AddLoanComponent, ButtonModule, ConfirmDialogModule, SharedModule, TableModule, ToastModule],
  providers:[ConfirmationService,MessageService],
  templateUrl: './returns-now.component.html',
  styleUrls: ['./returns-now.component.css']
})
export class ReturnsNowComponent implements OnInit{
  private loanService = inject(LoanService);
  private router = inject(Router);
  loans!:LoanDto[];

  ngOnInit(): void {
    this.loanService.getLoansRetunsNow().subscribe(
      response =>{
        this.loans = response;
      },
      error => console.log(error.error)
    );
  }

}
