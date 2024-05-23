import {Component, Input, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {LoanDto} from "../../../model";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-view-loan',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './view-loan.component.html',
  styleUrls: ['./view-loan.component.css']
})
export class ViewLoanComponent {
  @Input() displayModal:boolean = true;
  @Input() loan:any = null;
  showInvoice = false;
  constructor(private router:Router) {
  }


  getStartSale(){
    this.loan = null;
    this.router.navigate(['/loans/list-loans']);
  }
}
