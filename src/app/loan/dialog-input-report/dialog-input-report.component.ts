import {Component, inject, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogModule} from "primeng/dialog";
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {InputMaskModule} from "primeng/inputmask";
@Component({
  selector: 'app-dialog-input-report',
  standalone: true,
  imports: [CommonModule, DialogModule, InputTextModule, ReactiveFormsModule, ButtonModule, InputMaskModule],
  providers:[],
  templateUrl: './dialog-input-report.component.html',
  styleUrls: ['./dialog-input-report.component.css']
})
export class DialogInputReportComponent implements OnInit{
  type!:string;
  title!:string;
  init!:string;
  end!:string;

  route= inject(ActivatedRoute);
  router = inject(Router);
  displayAddModal:boolean = true;

  formMap = inject(FormBuilder);

  dateFormSimple = this.formMap.group(
    {
      init: ["",[Validators.required]],
      end: ["",[Validators.required]]
    }
  );

  carnetDateForm = this.formMap.group(
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
      if (this.type === 'total-cash') {
        this.router.navigate(['/report/total-cash'], {
          queryParams: {
            init: this.dateFormSimple.get('init')?.value,
            end: this.dateFormSimple.get('end')?.value
          }
        });
      } else if (this.type === 'more-career') {
        this.router.navigate(['/report/more-career'], {
          queryParams: {
            init: this.dateFormSimple.get('init')?.value,
            end: this.dateFormSimple.get('end')?.value
          }
        });
      }
    }
    validateSimpleForm(){
      return !this.dateFormSimple.invalid;
    }

    onHideDialog(){
      this.dateFormSimple.reset();
      this.type = ""
      this.title = ""
      this.router.navigate(['/']);
    }


}
