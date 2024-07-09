import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {JwtService} from "./jwt.service";
import {Credentials} from "../../model";
import {map} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);
  private jwtService: JwtService = inject(JwtService);
  constructor() {
  }

  getToken(){
    let token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : null;
  }

  login(credentials:Credentials){
    return this.http.post(`${this.baseUrl}/lb/api/v1/auth/signin`,credentials,{
      observe:'response'
    }).pipe(map((response:HttpResponse<any>)=>{
      const body = response.body;
      const headers = response.headers;
      const bearerToken = headers.get('Authorization');
      const token = bearerToken?.replace('Bearer ', '');
      localStorage.setItem('token', token!);

      return body;
    }))
  }

  isAuthenticated(){
    let token = localStorage.getItem('token');
    if (!token)return false;
    return token && !this.jwtService.isTokenExpired(token);
  }

  hasRequiredRol(rol: string): boolean {
    let token = localStorage.getItem('token');
    if (!token) return false;
    let userRol = this.jwtService.getClaim('rol');
    return userRol === rol;
  }
}
