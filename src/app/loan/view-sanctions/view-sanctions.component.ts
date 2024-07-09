import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {LoanService} from "../service/loan.service";
import {Router} from "@angular/router";
import {LoanDto} from "../../../model";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-view-sanctions',
  standalone: true,
  imports: [CommonModule, ConfirmDialogModule, SharedModule, TableModule, ToastModule],
  providers:[ConfirmationService,MessageService],
  templateUrl: './view-sanctions.component.html',
  styleUrls: ['./view-sanctions.component.css']
})
export class ViewSanctionsComponent implements OnInit{

  private loanService = inject(LoanService);
  private router = inject(Router);
  loans!:LoanDto[];

  ngOnInit(): void {
    this.loanService.getLoansSanction().subscribe(
      response =>{
        this.loans = response;
      },
      error => console.log(error.error)
    );
  }
}
