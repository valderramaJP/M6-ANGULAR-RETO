import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class State {
  private _isAuthenticated = new BehaviorSubject<boolean>(
    localStorage.getItem('isAuthenticated') === 'true' // Inicializa desde localStorage
  );

  // Observable para que otros componentes puedan suscribirse al estado
  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  // Getter para obtener el valor actual del estado
  get isAuthenticated(): boolean {
    return this._isAuthenticated.getValue();
  }

  // Setter para actualizar el estado y sincronizarlo con localStorage
  set isAuthenticated(value: boolean) {
    this._isAuthenticated.next(value);
    localStorage.setItem('isAuthenticated', value.toString());
  }

  // Método para limpiar el estado de autenticación
  clearAuthentication(): void {
    this._isAuthenticated.next(false);
    localStorage.removeItem('isAuthenticated');
  }
}