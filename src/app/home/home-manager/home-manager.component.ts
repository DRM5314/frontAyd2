import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-home-manager',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styles: ['']
})
export class HomeManagerComponent implements OnInit{
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
      return;
    }
    this.router.navigate(['/login']);
  }
}
