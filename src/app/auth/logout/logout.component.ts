import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  template : '',
  styles: ['']
})
export class LogoutComponent implements OnInit,OnDestroy{
  private router: Router = inject(Router);

  ngOnDestroy(): void {
    window.location.reload();
    }
  ngOnInit(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
