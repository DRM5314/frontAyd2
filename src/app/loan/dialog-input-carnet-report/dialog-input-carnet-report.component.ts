import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";
import {SharedModule} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-dialog-input-carnet-report',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule, FormsModule, InputMaskModule, ReactiveFormsModule, SharedModule, InputTextModule],
  templateUrl: './dialog-input-carnet-report.component.html',
  styleUrls: ['./dialog-input-carnet-report.component.css']
})
export class DialogInputCarnetReportComponent implements OnInit{
  type!:string;
  title!:string;
  init!:string;
  end!:string;

  route= inject(ActivatedRoute);
  router = inject(Router);
  displayAddModal:boolean = true;

  formMap = inject(FormBuilder);

  dateFormCarnet = this.formMap.group(
    {
      carnet: ["",[Validators.required]],
      init: ["",[Validators.required]],
      end: ["",[Validators.required]]
    }
  );

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
      this.title = params['title'];
    });
  }

  send():void {
    if (this.type === 'payment-more-student') {
      this.router.navigate(['/report/payment-more-student'], {
        queryParams: {
          carnet: this.dateFormCarnet.get('carnet')?.value,
          init: this.dateFormCarnet.get('init')?.value,
          end: this.dateFormCarnet.get('end')?.value
        }
      });
    }
  }
  validateSimpleForm(){
    return !this.dateFormCarnet.invalid;
  }

  onHideDialog(){
    this.dateFormCarnet.reset();
    this.type = ""
    this.title = ""
    this.router.navigate(['/']);
  }


}
