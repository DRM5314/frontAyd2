import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputMaskModule} from "primeng/inputmask";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-entry-simple',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule, InputMaskModule, PaginatorModule, ReactiveFormsModule, SharedModule, InputTextModule, ToastModule],
  providers:[MessageService],
  templateUrl: './entry-simple.component.html',
  styleUrls: ['./entry-simple.component.css']
})
export class EntrySimpleComponent implements OnInit{
  type!:string;
  typeLabel!:string;
  title!:string;
  init!:string;
  end!:string;

  route= inject(ActivatedRoute);
  router = inject(Router);
  displayAddModal:boolean = true;

  formMap = inject(FormBuilder);

  dateFormSimple = this.formMap.group(
    {
      code: ["",[Validators.required]],
    }
  );

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
      this.typeLabel = params['typeLabel'];
      this.title = params['title'];
    });
  }

  send():void {
    if (this.type === 'not-cancell-by-carnet') {
    this.router.navigate(['/report/not-cancell-by-carnet'], {
      queryParams: {
        code: this.dateFormSimple.get('code')?.value,
        devolutions: 'false'
      }
    });
  } else if (this.type === 'devolutions') {
      this.router.navigate(['/report/not-cancell-by-carnet'], {
        queryParams: {
          code: this.dateFormSimple.get('code')?.value,
          devolutions: 'true'
        }
      });
  }else if (this.type === 'more-career') {
  this.router.navigate(['/report/more-career'], {
    queryParams: {
      code: this.dateFormSimple.get('code')?.value,
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
