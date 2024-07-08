import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookCreateDto, BookDto, StudentDto} from "../../../model";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }
  private baseUrl = environment.apiUrl;
  private url: string = `${this.baseUrl}/lb/api/student`;

  public getStudents():Observable<StudentDto[]>{
    return this.http.get<StudentDto[]>(`${this.url}/findAll`);
  }


  // @ts-ignore
  public addEditStudent(postData:any, type:string):Observable<any>{
    if(type === "Agregar"){
      return this.http.post<StudentDto>(this.url,postData);
    }
    console.log(postData);
    return this.http.put<StudentService>(`${this.url}/${postData.carnet}`,postData);
  }
}
