import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookCreateDto, BookDto, LoanDto} from "../../../model";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http:HttpClient) { }
  private baseUrl = environment.apiUrl;
  private url: string = `${this.baseUrl}/lb/api/loan`;

  public getBooks():Observable<BookDto[]>{
    return this.http.get<BookDto[]>(`${this.url}/findAll`);
  }


  // @ts-ignore
  public addLoan(postData:any, type:string):Observable<any>{
    return this.http.post<BookCreateDto>(`${this.url}`,postData);
  }

  public getLoansRetunsNow():Observable<any>{
    return this.http.get<LoanDto[]>(`${this.url}/return-now`);
  }
  public getLoansSanction():Observable<any>{
    return this.http.get<LoanDto[]>(`${this.url}/sanction`);
  }
  public getTotalCash():Observable<any>{
    return this.http.get<LoanDto[]>(`${this.url}/total-cash`);
  }
}
