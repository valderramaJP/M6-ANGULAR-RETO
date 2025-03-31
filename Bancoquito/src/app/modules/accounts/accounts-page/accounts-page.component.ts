import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAccount, IAccountConsulted, IAccountCreate } from 'src/app/interfaces/accounts.interface';
import { AccountsService } from 'src/app/services/accounts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.css']
})
export class AccountsPageComponent implements OnInit {
  createAccountForm: FormGroup;
  consultAccountForm: FormGroup;
  consultedAccount: IAccountConsulted | null = null; 

  constructor(private fb: FormBuilder, private accountsService: AccountsService)  {
    // Inicializa el formulario de crear cuenta
    this.createAccountForm = this.fb.group({
      documentoTitular: ['', Validators.required],
      nroCuenta: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      direccion: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
      saldo: ['', [Validators.required, Validators.min(0)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      titular: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

   
    this.consultAccountForm = this.fb.group({
      nroCuenta: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  ngOnInit(): void {}

  // Método para manejar la creación de cuentas
  onCreateAccount(): void {
    if (this.createAccountForm.valid) {
      const account: IAccount = this.createAccountForm.value;
  
      this.accountsService.createAccount(account).subscribe({
        next: (response) => {
          this.consultedAccount = null;
          Swal.fire({
            icon: 'success',
            title: 'Cuenta creada',
            text: `Cuenta creada exitosamente. Número de cuenta: ${response.nroCuenta}`,
            confirmButtonText: 'Aceptar'
          });
  
          this.createAccountForm.reset(); 
        },
        error: (err) => {
          console.error('Error al crear la cuenta:', err);
          this.consultedAccount = null;
          const errorMessage = err.error || 'Ocurrió un error al crear la cuenta. Por favor, inténtalo de nuevo.';

        
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }


 
  onConsultAccount(): void {
    if (this.consultAccountForm.valid) {
      const account: IAccountCreate = this.consultAccountForm.value;
  
      this.accountsService.consultAccount(account).subscribe({
        next: (response) => {
          this.consultedAccount = response; 
        },
        error: (err) => {
          console.error('Error al consultar la cuenta:', err);
          this.consultedAccount = null;
  
          const errorMessage = err.error || 'Ocurrió un error al consultar la cuenta. Por favor, inténtalo de nuevo.';

         
          Swal.fire({
            icon: 'error',
            title: 'Error al consultar la cuenta',
            text: errorMessage,
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }

}