import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookCreateDto, EditorialCreateDto, EditorialDto} from "../../../model";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class EditorialService {
  private baseUrl = environment.apiUrl;
  private url: string = `${this.baseUrl}/lb/api/editorial`;
  constructor(private http:HttpClient) { }

  public getEditorials():Observable<EditorialDto[]>{
    return this.http.get<EditorialDto[]>(`${this.url}/findAll`);
  }

  public addEditEditorial(postData:any, type:string):Observable<any>{
    if(type === "Agregar"){
      return this.http.post<EditorialDto>(`${this.url}`,postData.name);
    }
    console.log(postData);
    return this.http.put<EditorialDto>(`${this.url}/${postData.id}`,postData);
  }
}
