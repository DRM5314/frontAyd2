import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {reportStudentPaymentSanction} from "../../../model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private url =`${this.baseUrl}/lb/api/payment`;
  constructor() { }
  public postPayment(postData:any):Observable<reportStudentPaymentSanction>{
    return this.http.post<reportStudentPaymentSanction>(`${this.url}`,postData);
  }
  public getReport(postData:any):Observable<reportStudentPaymentSanction>{
    return this.http.post<reportStudentPaymentSanction>(`${this.url}/more-student`,postData);
  }
  public getMyPayments():Observable<reportStudentPaymentSanction>{
    return this.http.get<reportStudentPaymentSanction>(`${this.url}/payment-me`);
  }

}
