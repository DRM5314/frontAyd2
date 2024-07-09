import { NgModule } from '@angular/core';
import {mapToCanActivate, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {path:'', redirectTo:'/homepage', pathMatch:'full'},
  {
    path: 'homepage',
    loadComponent: () => import('./home/home-manager/home-manager.component')
      .then(c => c.HomeManagerComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component')
      .then(c=> c.HomeComponent)
  },
  {
    path:'books',
    data: { requireAuthentication: true},
    canActivate: mapToCanActivate([AuthGuard]),
    children:[
      {
        path:'list-books',
        loadComponent:() =>import('./book/register.component')
          .then(c=>c.RegisterComponent),
        data: { requiredRol: ["ADMIN","STUDENT"]}
      },
      {
        path:'list-editorial',
        data: { requiredRol: ["ADMIN"]},
        loadComponent:() =>import('./editorial/editorial.component')
          .then(c=>c.EditorialComponent)
      }
    ],
  },
  {
    path:'students',
    data: { requireAuthentication: true, requiredRol: ['ADMIN'] },
    canActivate: mapToCanActivate([AuthGuard]),
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
    data: { requireAuthentication: true, requiredRol: ['ADMIN'] },
    canActivate: mapToCanActivate([AuthGuard]),
    children:[
      {
        path:'list-loans',
        loadComponent:() =>import('./loan/loan.component')
          .then(c=>c.LoanComponent)
      }
    ]
  },
  {
    path:'login',
    loadComponent:() => import('./auth/login/login.component')
      .then(c => c.LoginComponent)
  },
  {
    path: 'logout',
    loadComponent: () => import('./auth/logout/logout.component')
      .then(c => c.LogoutComponent)
  },
  {
    path:'report',
    data: { requireAuthentication: true, requiredRol: ['ADMIN'] },
    canActivate: mapToCanActivate([AuthGuard]),
    children:[
      {
        path:'loans-now',
        loadComponent:() =>import('./loan/returns-now/returns-now.component')
          .then(c=>c.ReturnsNowComponent)
      },
      {
        path:'loans-sanction',
        loadComponent:() =>import('./loan/view-sanctions/view-sanctions.component')
          .then(c=>c.ViewSanctionsComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
