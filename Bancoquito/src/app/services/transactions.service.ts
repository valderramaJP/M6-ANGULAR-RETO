import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGeneralResponse, IGeneralTransaction, ILast5Transactions, IResponse5Transactions, ITransferTransaction } from '../interfaces/transactions.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

   // Método para transacciones generales (depósitos, retiros, compras)
   performGeneralTransaction(url: string, data: IGeneralTransaction): Observable<IGeneralResponse> {
    return this.http.post<IGeneralResponse>(url, data);
  }

  // Método para transferencias entre cuentas
  performTransferencia(url: string, data: ITransferTransaction): Observable<IGeneralResponse> {
    return this.http.post<IGeneralResponse>(url, data);
  }

  // Método para consultar últimas transacciones
  getLast5Transactions(url: string, data: ILast5Transactions): Observable<IResponse5Transactions[]> {
    console.log('Data:', data); 
    return this.http.post<IResponse5Transactions[]>(url, data);
  }
}