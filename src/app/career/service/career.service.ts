import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookCreateDto, BookDto, CareerDto, CareerRequestDto} from "../../../model";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http:HttpClient) { }
  private baseUrl = environment.apiUrl;
  private url: string = `${this.baseUrl}/lb/api/career`;

  public getCareer():Observable<CareerDto[]>{
    return this.http.get<CareerDto[]>(`${this.url}/findAll`);
  }

  public addEdit(postData:any, type:string):Observable<any>{
    if(type === "Agregar"){
      return this.http.post<CareerDto>(this.url,postData.name);
    }
    console.log(postData);
    return this.http.put<CareerDto>(`${this.url}/${postData.id}`,postData);
  }
}
