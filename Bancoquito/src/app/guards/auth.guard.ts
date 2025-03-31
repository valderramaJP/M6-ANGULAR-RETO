import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { State } from "../state/state";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private state: State, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.state.isAuthenticated;
        
    if (isAuthenticated) {
      console.log('Usuario autenticado, acceso permitido.');
      return true; // Permite el acceso
    } else {
      console.log('Usuario no autenticado, redirigiendo a /auth.');
      return this.router.createUrlTree(['/auth']); // Redirige al login
    } 
  }
}
