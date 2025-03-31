import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IResponse5Transactions } from 'src/app/interfaces/transactions.interface';
import { TransactionsService } from 'src/app/services/transactions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css']
})
export class TransactionsPageComponent {
  transactionForm: FormGroup;
  selectedTransaction: any = null;
  transactionResult: string | null = null;
  last5Transactions: IResponse5Transactions[] = [];
  
  constructor(private fb: FormBuilder, private transactionsService: TransactionsService) {
    this.transactionForm = this.fb.group({});
  }

  // Configuración de las transacciones
  transactions = {
    depositoSucursal: {
      title: 'Depósito en Sucursal',
      url: 'http://localhost:8080/transaccion/deposito/sucursal',
      form: true,
      fields: [
        { name: 'cuentaAsociada', label: 'Cuenta Asociada', type: 'text', placeholder: 'Ingrese la cuenta asociada' },
        { name: 'valor', label: 'Valor', type: 'number', placeholder: 'Ingrese el valor' }
      ]
    },
    depositoCajero: {
      title: 'Depósito en Cajero',
      url: 'http://localhost:8080/transaccion/deposito/cajero',
      form: true,
      fields: [
        { name: 'cuentaAsociada', label: 'Cuenta Asociada', type: 'text', placeholder: 'Ingrese la cuenta asociada' },
        { name: 'valor', label: 'Valor', type: 'number', placeholder: 'Ingrese el valor' }
      ]
    },
    compraFisica: {
      title: 'Compra Física',
      url: 'http://localhost:8080/transaccion/compra/fisico',
      form: true,
      fields: [
        { name: 'cuentaAsociada', label: 'Cuenta Asociada', type: 'text', placeholder: 'Ingrese la cuenta asociada' },
        { name: 'valor', label: 'Valor', type: 'number', placeholder: 'Ingrese el valor' }
      ]
    },
    compraWeb: {
      title: 'Compra Web',
      url: 'http://localhost:8080/transaccion/compra/web',
      form: true,
      fields: [
        { name: 'cuentaAsociada', label: 'Cuenta Asociada', type: 'text', placeholder: 'Ingrese la cuenta asociada' },
        { name: 'valor', label: 'Valor', type: 'number', placeholder: 'Ingrese el valor' }
      ]
    },
    retiro: {
      title: 'Retiro',
      url: 'http://localhost:8080/transaccion/retiro/cajero',
      form: true,
      fields: [
        { name: 'cuentaAsociada', label: 'Cuenta Asociada', type: 'text', placeholder: 'Ingrese la cuenta asociada' },
        { name: 'valor', label: 'Valor', type: 'number', placeholder: 'Ingrese el valor' }
      ]
    },
    transferencias: {
      title: 'Transferencia entre Cuentas',
      url: 'http://localhost:8080/transaccion/transferencia',
      form: true,
      fields: [
        { name: 'cuentaOrigen', label: 'Cuenta Origen', type: 'text', placeholder: 'Ingrese la cuenta origen' },
        { name: 'cuentaDestino', label: 'Cuenta Destino', type: 'text', placeholder: 'Ingrese la cuenta destino' },
        { name: 'valor', label: 'Valor', type: 'number', placeholder: 'Ingrese el valor' }
      ]
    },
    ultimas5: {
      title: 'Últimas 5 Transacciones',
      url: 'http://localhost:8080/transaccion/transacciones/ultimas5',
      form: true,
      fields: [
        { name: 'nroCuenta', label: 'Número de Cuenta', type: 'text', placeholder: 'Ingrese el número de cuenta' }
      ]
    }
  };

  
  // Método para manejar las opciones seleccionadas
  onTransaction(type: keyof typeof this.transactions) {
    this.selectedTransaction = this.transactions[type];
    this.last5Transactions = [];
    const controls: { [key: string]: any } = {};
    if (this.selectedTransaction.form) {
      this.selectedTransaction.fields.forEach((field: any) => {
        controls[field.name] = ['', Validators.required];
      });
      this.transactionForm = this.fb.group(controls);
    }
  }

  // Método para manejar el envío del formulario
  onSubmitTransaction() {
    if (this.selectedTransaction && this.selectedTransaction.url) {
      const url = this.selectedTransaction.url;
      const data = this.transactionForm.value;
  
      if (this.selectedTransaction.title === 'Últimas 5 Transacciones') {
        // Llama al servicio para consultar las últimas 5 transacciones
        this.transactionsService.getLast5Transactions(url, data).subscribe({
          next: (response) => {
            console.log('Respuesta del backend:', response);
            this.last5Transactions = response; 
            Swal.fire({
              icon: 'success',
              title: 'Consulta Exitosa',
              text: 'Se han obtenido las últimas 5 transacciones.'
            });
          },
          error: (err) => {
            console.error('Error al consultar las últimas 5 transacciones:', err);
            this.last5Transactions = []; 
            const errorMessage = err.error  || 'No se pudieron obtener las últimas 5 transacciones.';
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: errorMessage
            });
          }
        });
      } else {
        // Manejo de otras transacciones
        this.transactionsService.performGeneralTransaction(url, data).subscribe({
          next: (response) => {
            const mensaje = response.mensaje.replace(/\.\s*/g, '<br>');
            Swal.fire({
              icon: 'success',
              title: 'Transacción Exitosa',
              html: mensaje
            });
            this.transactionForm.reset();
          },
          error: (err) => {
            const errorMessage = err.error;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `Error al realizar la transacción "${this.selectedTransaction.title}". ${errorMessage}`
            });
          }
        });
      }
    }
  }
}
