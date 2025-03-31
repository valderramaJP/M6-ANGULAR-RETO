import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  // Método para validar login.
  login(credentials: ILogin): Observable<ILogin> {
    const url = `http://localhost:8080/cuenta/login?usuario=${encodeURIComponent(credentials.usuario)}&pass=${encodeURIComponent(credentials.pass)}`;
  return this.http.get<ILogin>(url);
  }

  
}