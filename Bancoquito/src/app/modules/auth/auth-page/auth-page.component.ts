import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/interfaces/login.interface';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  private formBuilder = inject(FormBuilder);
  
  errorMessage: string = ''; // Mensaje de error para mostrar en el formulario

  constructor(
    private authService: AuthService,
    private state: State, // Inyecta el servicio State
    private router: Router
  ) {}

  // Configuración del formulario reactivo
  loginForm = this.formBuilder.group({
    usuario: ['', [Validators.required, Validators.email]], // Campo obligatorio y debe ser un email válido
    pass: ['', [Validators.required, Validators.minLength(6)]] // Campo obligatorio con mínimo 6 caracteres
  });

  // Método para manejar el envío del formulario
  submit() {    
    if (!this.loginForm.valid) { 
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return; 
    }
  
    const credentials: ILogin = this.loginForm.value as ILogin;

    // Llama al servicio para validar las credenciales
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);

        // Guarda el estado de autenticación en localStorage
        this.state.isAuthenticated = true;

        // Redirige al dashboard
        this.router.navigate(['/auth/dashboard']);
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        const errorMessage = err.error?.message || 'Usuario o contraseña incorrectos';
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: errorMessage,
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
