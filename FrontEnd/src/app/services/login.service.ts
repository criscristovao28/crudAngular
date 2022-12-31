import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Login from '../models/Product';
import { Observable, tap } from 'rxjs';
import LoginResponse from '../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService 
{
  url="https://localhost:7242/api/auth";
  
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse>
  {
    return this.http.post<LoginResponse>(`${this.url}/login`, { email, password, })
    .pipe(
      tap({
        next: p=> this.setToken(p.token)
      })
    )
    ;
  }

  private setToken(token: string)
  {
    localStorage.setItem('token', token)
  }

  ifLogeddIn()
  {
    return localStorage.getItem('token')!=null;
  }

  logout(){
    localStorage.removeItem('token');
  }

}
