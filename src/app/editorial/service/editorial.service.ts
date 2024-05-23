import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookCreateDto, EditorialCreateDto, EditorialDto} from "../../../model";

@Injectable({
  providedIn: 'root'
})
export class EditorialService {
  private url: string = "http://localhost:3000/lb/api/editorial";
  constructor(private http:HttpClient) { }

  public getEditorials():Observable<EditorialDto[]>{
    return this.http.get<EditorialDto[]>(`${this.url}/findAll`);
  }

  public addEditEditorial(postData:any, type:string):Observable<any>{
    if(type === "Agregar"){
      var create = new EditorialCreateDto();
      create = postData.name;
      return this.http.post<EditorialDto>(this.url,create);
    }
    console.log(postData);
    return this.http.put<EditorialDto>(`${this.url}/${postData.id}`,postData);
  }
}
