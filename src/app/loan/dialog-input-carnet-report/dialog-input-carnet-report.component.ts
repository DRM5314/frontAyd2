import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";
import {SharedModule} from "primeng/api";

@Component({
  selector: 'app-dialog-input-carnet-report',
  standalone: true,
    imports: [CommonModule, ButtonModule, DialogModule, FormsModule, InputMaskModule, ReactiveFormsModule, SharedModule],
  templateUrl: './dialog-input-carnet-report.component.html',
  styleUrls: ['./dialog-input-carnet-report.component.css']
})
export class DialogInputCarnetReportComponent {

}
