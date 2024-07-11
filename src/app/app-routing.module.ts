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
      },
      {
        path:'with-date',
        loadComponent:() =>import('./loan/dialog-input-report/dialog-input-report.component')
          .then(c=>c.DialogInputReportComponent)
      },
      {
        path:'total-cash',
        loadComponent:() =>import('./loan/report-total-cash/report-total-cash.component')
          .then(c=>c.ReportTotalCashComponent)
      },
      {
        path:'more-career',
        loadComponent:() =>import('./loan/career-more-loans/career-more-loans.component')
          .then(c=>c.CareerMoreLoansComponent)
      },
      {
        path:'input-payment-more-student',
        loadComponent:() =>import('./loan/dialog-input-carnet-report/dialog-input-carnet-report.component')
          .then(c=>c.DialogInputCarnetReportComponent)
      },
      {
        path:'payment-more-student',
        loadComponent:() =>import('./loan/report-student-payment-sanction/report-student-payment-sanction.component')
          .then(c=>c.ReportStudentPaymentSanctionComponent)
      },
      {
        path:'student-more-loans',
        loadComponent:() =>import('./loan/report-student-more-loans/report-student-more-loans.component')
          .then(c=>c.ReportStudentMoreLoansComponent)
      },
      {
        path:'not-cancell-by-carnet',
        loadComponent:() =>import('./loan/report-student-loans-not-cancelled/report-student-loans-not-cancelled.component')
          .then(c=>c.ReportStudentLoansNotCancelledComponent)
      },
      {
        path:'with-entry-code',
        loadComponent:() =>import('./loan/entry-simple/entry-simple.component')
          .then(c=>c.EntrySimpleComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
