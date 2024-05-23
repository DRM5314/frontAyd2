import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookCreateDto, BookDto} from "../../../model";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }
  private url: string = "http://localhost:3000/lb/api/book";

  public getBooks():Observable<BookDto[]>{
    return this.http.get<BookDto[]>(`${this.url}/findAll`);
  }


  // @ts-ignore
  public addEditBook(postData:any, type:string):Observable<any>{
    if(type === "Agregar"){
      return this.http.post<BookCreateDto>(this.url,postData);
    }
    console.log(postData);
    return this.http.put<BookCreateDto>(`${this.url}/${postData.code}`,postData);
  }
}
