import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookCreateDto, BookDto, CareerDto, CareerRequestDto} from "../../../model";

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http:HttpClient) { }
  private url: string = "http://localhost:3000/lb/api/career";

  public getCareer():Observable<CareerDto[]>{
    return this.http.get<CareerDto[]>(`${this.url}/findAll`);
  }

  public addEdit(postData:any, type:string):Observable<any>{
    if(type === "Agregar"){
      var requestDto = new CareerRequestDto();
      requestDto.names = postData.name;
      console.log(requestDto);
      return this.http.post<CareerDto>(this.url,JSON.stringify(requestDto));
    }
    console.log(postData);
    return this.http.put<CareerDto>(`${this.url}/${postData.code}`,postData);
  }
}
