import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAccount, IAccountConsulted, IAccountCreate } from '../interfaces/accounts.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }


  // Método para crear una cuenta
  createAccount(account: IAccount): Observable<IAccountCreate> {
    return this.http.post<IAccountCreate>('http://localhost:8080/cuenta/crear', account);
  }

  // Método para consultar una cuenta
  consultAccount(account: IAccountCreate): Observable<IAccountConsulted> {
    console.log('consultAccount', account);
    return this.http.post<IAccountConsulted>('http://localhost:8080/cuenta/saldo', account);
  }
}
