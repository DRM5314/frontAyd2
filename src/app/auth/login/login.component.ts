import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessageService} from "primeng/api";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Credentials} from "../../../model";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService]
})
export class LoginComponent implements OnInit{
  private messageService: MessageService = inject(MessageService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private forMap:FormBuilder = inject(FormBuilder);

  credentials: Credentials = new Credentials();
  loginForm = this.forMap.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    }
  );

  ngOnInit() {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
      return;
    }
  }

  onSubmit(){
    //@ts-ignore
    this.credentials.username = this.loginForm.get('username')?.value;
    //@ts-ignore
    this.credentials.password = this.loginForm.get('password')?.value;
    this.authService.login(this.credentials).subscribe({
      next: response =>{
        window.location.reload();
      },
      error: error => {
        this.messageService.add({severity:'error', summary:'Error',detail:'Bad credentials!'})
      }
    })

  }

}
