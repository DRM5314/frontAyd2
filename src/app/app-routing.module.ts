import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";

const routes: Routes = [
  {
    path:'books',
    children:[
      {
        path:'list-books',
        loadComponent:() =>import('./book/register.component')
          .then(c=>c.RegisterComponent)
      },
      {
        path:'list-editorial',
        loadComponent:() =>import('./editorial/editorial.component')
          .then(c=>c.EditorialComponent)
      }
    ],
  },
  {
    path:'students',
    children:[
      {
        path:'list-students',
        loadComponent:() =>import('./student/student.component')
          .then(c=>c.StudentComponent)
      },
      {
        path:'list-careers',
        loadComponent:() =>import('./career/career.component')
          .then(c=>c.CareerComponent)
      }
    ]
  },
  {
    path:'loans',
    children:[
      {
        path:'list-loans',
        loadComponent:() =>import('./loan/loan.component')
          .then(c=>c.LoanComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
