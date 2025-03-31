import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from 'src/app/state/state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  isOnHomePage: boolean = false;

  constructor(private state: State, private router: Router) {}

  ngOnInit(): void {
    this.state.isAuthenticated$.subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
    });
    this.router.events.subscribe(() => {
      this.isOnHomePage = this.router.url === '/';
    });
  }

  onLogout(): void {
    // Limpia el estado de autenticación
    this.state.clearAuthentication();
  Swal.fire({
    icon: 'success',
    title: 'Sesión cerrada',
    text: 'Has cerrado sesión con éxito.',
    confirmButtonText: 'Aceptar'
  }).then(() => {
    this.router.navigate(['']);
  });
  }
}